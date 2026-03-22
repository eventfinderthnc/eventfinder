import "dotenv/config";
import { db } from "@/server/db";
import { faculty } from "@/server/db/faculty";
import { interest } from "@/server/db/interest";
import { sql } from "drizzle-orm";
import { randomUUID } from "crypto";

const faculties = [
	"Allied Health Sciences",
	"Architecture",
	"Arts",
	"Commerce and Accountancy",
	"Communication Arts",
	"Dentistry",
	"Economics",
	"Education",
	"Engineering",
	"Fine and Applied Arts",
	"Laws",
	"Medicine",
	"Nursing",
	"Pharmaceutical Sciences",
	"Political Science",
	"Psychology",
	"Science",
	"Sports Science",
	"Veterinary Science",
	"School of Integrated Innovation",
	"Agricultural Resources",
	"Graduate School",
] as const;

const interests = [
	{ name: "ธุรกิจ", icon: "BriefcaseBusiness" },
	{ name: "เทคโนโลยี", icon: "Cpu" },
	{ name: "แพทย์", icon: "HeartPulse" },
	{ name: "กีฬา", icon: "Volleyball" },
	{ name: "พัฒนาชุมชน", icon: "HandHeart" },
	{ name: "สารสนเทศ", icon: "Monitor" },
	{ name: "ศิลปะ", icon: "Palette" },
	{ name: "ดนตรี", icon: "Music" },
	{ name: "การศึกษา", icon: "GraduationCap" },
] as const;

async function main() {
	console.log("Seeding faculties and interests...");

	await db.transaction(async (tx) => {
		// Faculties: insert only if name not already present (no unique on name)
		const existingFacultyNames = await tx.select({ name: faculty.name }).from(faculty);
		const existingSet = new Set(existingFacultyNames.map((r) => r.name));
		for (const name of faculties) {
			if (existingSet.has(name)) continue;
			await tx.insert(faculty).values({ id: randomUUID(), name });
			existingSet.add(name);
		}

		// Interests: upsert by name (interest.name is unique)
		for (const item of interests) {
			await tx
				.insert(interest)
				.values({ id: randomUUID(), name: item.name, icon: item.icon })
				.onConflictDoUpdate({
					target: interest.name,
					set: {
						icon: sql`excluded.icon`,
					},
				});
		}
	});

	console.log("Seeding completed.");
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main().then(() => process.exit(0));
