import { type organization, categoryEnum } from "@/server/db/organization";
import { z, type ZodSchema } from "zod";

export type Organization = typeof organization.$inferSelect;
export type CategoryEnum = typeof categoryEnum.enumValues;

export type CreateOrganizationRequest = Omit<typeof organization.$inferInsert, "id" | "createdAt" | "updatedAt">;

const SmallIntSchema = z.number()
    .int()
    .min(-32768)
    .max(32767);

const RecruitmentPeriodSchema = z.object({
    allYear: z.boolean().optional(),
    start: z.date().optional(),
    end: z.date().optional(),
});

const SocialsSchema = z.object({
    signUpForm: z.string().optional(),
    discord: z.string(),
    instagram: z.string(),
});

export const CreateOrganizationRequestSchema: ZodSchema<CreateOrganizationRequest> = z.object({
    category: z.enum(categoryEnum.enumValues),
    averageHoursPerWeek: SmallIntSchema.optional(),
    bio: z.string(),
    recruitmentPeriod: RecruitmentPeriodSchema,
    userId: z.string(),
    isBanned: z.boolean(),
    socials: SocialsSchema,
});

export const UpdateOrganizationRequestSchema = z.object({
    id: z.number(),
    category: z.enum(categoryEnum.enumValues).optional(),
    averageHoursPerWeek: SmallIntSchema.optional(),
    bio: z.string().optional(),
    recruitmentPeriod: RecruitmentPeriodSchema.optional(),
    userId: z.string().optional(),
    isBanned: z.boolean().optional(),
    socials: SocialsSchema.optional(),
});