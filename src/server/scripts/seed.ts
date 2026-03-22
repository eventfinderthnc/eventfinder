import "dotenv/config";
import { randomUUID } from "crypto";
import { db } from "@/server/db";
import { activityType } from "@/server/db/activityType";
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

const activityTypes = [
  "สัมมนา / บรรยาย",
  "วอร์คชอป / อบรม",
  "การแข่งขัน",
  "นิทรรศการ / งานแสดง",
  "คอนเสิร์ต / การแสดง",
  "กิจกรรมอาสา / ชุมชน",
  "Networking",
  "กิจกรรมกีฬา",
  "งานเปิดรับสมัคร / รับสมาชิก",
  "อื่นๆ",
] as const;

async function main() {
  console.log("Seeding faculty, activity types, and interests...");

  await db.transaction(async (tx) => {
    // Faculties: insert only if name not already present (no unique on name)
    const existingFacultyNames = await tx
      .select({ name: faculty.name })
      .from(faculty);
    const existingFacultySet = new Set(existingFacultyNames.map((r) => r.name));
    for (const name of faculties) {
      if (existingFacultySet.has(name)) continue;
      await tx.insert(faculty).values({ id: randomUUID(), name });
      existingFacultySet.add(name);
    }

    // Activity types: insert only if name not already present (no unique on name)
    const existingActivityTypeNames = await tx
      .select({ name: activityType.name })
      .from(activityType);
    const existingActivityTypeSet = new Set(
      existingActivityTypeNames.map((r) => r.name),
    );
    for (const name of activityTypes) {
      if (existingActivityTypeSet.has(name)) continue;
      await tx.insert(activityType).values({ id: randomUUID(), name });
      existingActivityTypeSet.add(name);
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
