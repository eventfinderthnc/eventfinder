import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { uploadImage } from "@/server/services/r2";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BASE64_SIZE = 7 * 1024 * 1024; // ~5MB image in base64 is ~7MB

export const uploadRouter = createTRPCRouter({
	uploadImage: publicProcedure
		.input(
			z.object({
				data: z.string().max(MAX_BASE64_SIZE),
				contentType: z.enum([
					"image/jpeg",
					"image/png",
					"image/webp",
					"image/gif",
				]),
			}),
		)
		.mutation(async ({ input }) => {
			if (!ALLOWED_TYPES.includes(input.contentType)) {
				throw new Error(`Unsupported type: ${input.contentType}`);
			}
			const buffer = Buffer.from(input.data, "base64");
			const url = await uploadImage(buffer, input.contentType);
			return { url };
		}),
});
