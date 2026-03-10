"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "@/trpc/react";

export interface UseImageUploadOptions {
	/** If true, upload file to R2 and call onUploaded with the public URL */
	upload?: boolean;
	onUploaded?: (url: string) => void;
}

const PREVIEW_IMG_STYLE =
	"height:100%; width:100%; border-radius: 9999px; object-fit:cover; border: 1px solid #d6d6d6";

export function fileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const r = new FileReader();
		r.onload = () => {
			const s = r.result as string;
			resolve(s.includes(",") ? s.split(",")[1]! : s);
		};
		r.onerror = () => reject(r.error);
		r.readAsDataURL(file);
	});
}

export default function useImageUpload(
	inputID: string,
	divID: string,
	options?: UseImageUploadOptions,
) {
	const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const objectUrlRef = useRef<string | null>(null);
	const withUpload = options?.upload === true;
	const onUploaded = options?.onUploaded;

	const uploadMutation = api.upload.uploadImage.useMutation({
		onSuccess: (res) => setUploadedUrl(res.url),
		onError: (e) => setError(e.message),
	});

	useEffect(() => {
		const input = document.getElementById(inputID) as HTMLInputElement | null;
		const div = document.getElementById(divID) as HTMLElement | null;
		if (!input || !div) return;

		const handler = async () => {
			const file = input.files?.[0];
			if (!file) return;
			if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
			objectUrlRef.current = URL.createObjectURL(file);
			div.style.border = "none";
			div.innerHTML = `<img id="profile-picture-image" style="${PREVIEW_IMG_STYLE}" src="${objectUrlRef.current}" alt="Profile"/>`;

			if (withUpload) {
				setError(null);
				try {
					const data = await fileToBase64(file);
					const res = await uploadMutation.mutateAsync({
						data,
						contentType: file.type as "image/jpeg" | "image/png" | "image/webp" | "image/gif",
					});
					onUploaded?.(res.url);
				} catch {
					// error set by onError
				}
			}
		};

		input.addEventListener("change", handler);
		return () => {
			input.removeEventListener("change", handler);
			if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
		};
	}, [inputID, divID, withUpload, onUploaded]);

	return {
		uploadedUrl,
		isUploading: uploadMutation.isPending,
		error,
	};
}
