"use client";

import useImageUpload from "@/lib/hooks/useImageUpload";
import { Input } from "@/components/ui/Input";

const INPUT_ID = "upload-test-input";
const PREVIEW_DIV_ID = "upload-test-preview";

export default function UploadTestPage() {
	const { uploadedUrl, isUploading, error } = useImageUpload(INPUT_ID, PREVIEW_DIV_ID, {
		upload: true,
		onUploaded: (url) => console.log("Uploaded:", url),
	});

	return (
		<div className="mx-auto max-w-md space-y-6 p-6">
			<h1 className="text-xl font-semibold">R2 upload test</h1>
			<label className="block">
				<span className="mb-2 block text-sm text-gray-600">Choose image (uploads to R2)</span>
				<Input id={INPUT_ID} type="file" accept="image/jpeg,image/png,image/webp" className="block w-full" />
			</label>
			<div className="rounded-lg border border-gray-200 p-2">
				<div
					id={PREVIEW_DIV_ID}
					className="flex h-40 items-center justify-center rounded bg-gray-50 text-gray-400"
				>
					Preview
				</div>
			</div>
			{isUploading && <p className="text-sm text-amber-600">Uploading…</p>}
			{error && <p className="text-sm text-red-600">{error}</p>}
			{uploadedUrl && (
				<div className="space-y-1">
					<p className="text-sm font-medium text-gray-700">Public URL:</p>
					<a
						href={uploadedUrl}
						target="_blank"
						rel="noreferrer"
						className="block truncate text-sm text-blue-600 underline"
					>
						{uploadedUrl}
					</a>
				</div>
			)}
		</div>
	);
}
