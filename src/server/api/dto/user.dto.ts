import { type user, userTypeEnum } from "@/server/db/user";
import { z, type ZodSchema } from "zod";

export type User = typeof user.$inferSelect;
export type UserTypeEnum = typeof userTypeEnum.enumValues;

export type CreateUserRequest = Omit<typeof user.$inferInsert, "id" | "name" | "image" | "facultyId" | "isReceiveMail" | "createdAt" | "updatedAt">;

export const CreateUserRequestSchema: ZodSchema<CreateUserRequest> = z.object({
    username: z.string(),
    password: z.string(),
    type: z.enum(userTypeEnum.enumValues),
}); 

export const UpdateUserRequestSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
    image: z.string().optional(),
    facultyId: z.number().optional(),
    isReceiveMail: z.boolean().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    type: z.enum(userTypeEnum.enumValues).optional(),
});