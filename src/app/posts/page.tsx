"use client";

import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import { SearchBar } from "@/components/ui/SearchBar";
import { useSession } from "@/lib/auth-client";
import { api } from "@/trpc/react";
import { ChevronDown, SquarePlus, SquarePen, Trash2, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { PostCard } from "./_components/PostCard";

type Data = {
  id: number;
  accountName: string;
  profileImage: string;
  image: string;
  title: string;
  tags: string[];
  description: string;
  themeColor: string;
  formLink: string;
  closeDate: string;
};

const data: Data[] = [
  {
    id: 1,
    accountName: "Thinc.",
    profileImage: "/images/thinc-profile.png",
    image: "/images/thinc-recruitment.png",
    title: "Thinc. Recruitment Timeline",
    tags: ["Tech", "UX/UI", "Marketing"],
    description:
      "Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา & This is for testing & This is for testing & This is for testing & This is for testing & This is for testing & This is for testing Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา & This is for testing & This is for testing & This is for testing & This is for testing & This is for testing & This is for testing",
    themeColor: "#DF5C8E",
    formLink: "https://docs.google.com/forms/u/0",
    closeDate: "2025-12-25T23:59:00+07:00",
  },
  {
    id: 2,
    accountName: "Thinc.",
    profileImage: "/images/thinc-profile.png",
    image: "/images/thinc-recruitment.png",
    title: "Thinc. Recruitment Timeline",
    tags: ["Tech", "UX/UI", "Marketing"],
    description:
      "Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา",
    themeColor: "#DF5C8E",
    formLink: "https://docs.google.com/forms/u/0",
    closeDate: "2025-12-25T23:59:00+07:00",
  },
  {
    id: 3,
    accountName: "Thinc.",
    profileImage: "/images/thinc-profile.png",
    image: "/images/thinc-recruitment.png",
    title: "Thinc. Recruitment Timeline",
    tags: ["Tech", "UX/UI", "Marketing"],
    description:
      "Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา",
    themeColor: "#DF5C8E",
    formLink: "https://docs.google.com/forms/u/0",
    closeDate: "2025-12-25T23:59:00+07:00",
  },
  {
    id: 4,
    accountName: "Thinc.",
    profileImage: "/images/thinc-profile.png",
    image: "/images/thinc-recruitment.png",
    title: "Thinc. Recruitment Timeline",
    tags: ["Tech", "UX/UI", "Marketing", "Marketing", "Marketing"],
    description:
      "Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา",
    themeColor: "#DF5C8E",
    formLink: "https://docs.google.com/forms/u/0",
    closeDate: "2025-12-25T23:59:00+07:00",
  },
  {
    id: 5,
    accountName: "Thinc.",
    profileImage: "/images/thinc-profile.png",
    image: "/images/thinc-recruitment.png",
    title: "Thinc. Recruitment Timeline",
    tags: ["Tech", "UX/UI", "Marketing"],
    description:
      "Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา",
    themeColor: "#DF5C8E",
    formLink: "https://docs.google.com/forms/u/0",
    closeDate: "2025-12-25T23:59:00+07:00",
  },
  {
    id: 6,
    accountName: "Thinc.",
    profileImage: "/images/thinc-profile.png",
    image: "/images/thinc-recruitment.png",
    title: "Thinc. Recruitment Timeline",
    tags: ["Tech", "UX/UI", "Marketing"],
    description:
      "Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา",
    themeColor: "#DF5C8E",
    formLink: "https://docs.google.com/forms/u/0",
    closeDate: "2025-12-25T23:59:00+07:00",
  },
];

// ESLint Error
// const tagColor: {
//   [key: string]: string
// } = {
//   "Tech": "#4369c1",
//   "UX/UI": "#c16ddd",
//   "Marketing": "#e7935f",
// };
const tagColor: Record<string, string> = {
  "Tech": "#4369c1",
  "UX/UI": "#c16ddd",
  "Marketing": "#e7935f",
};

const PostsBoardPage = () => {

  const router = useRouter();
  const [up, setUp] = useState(false);

  const { data: session } = useSession();
  const { data: posts, isLoading, error } = api.post.getByFilter.useQuery({ userId: "08ec669b-fdfc-4d7e-8b5a-4bed2477b354" }, {
    enabled: !!session?.user.id || true
  });

  return (
    <div>
      <Navbar />
      {
        <section className="body-section gap-[1px] sm:gap-3">
          <div className="text-primary font-[600] text-[24px] sm:text-[28px]">
            โพสต์ของฉัน
          </div>
          <div className="flex flex-col items-end sm:flex-row items-center gap-y-2 sm:gap-x-4">
            <div className="sm:hidden flex gap-x-2">
              <Dropdown menuContentClassName="w-[30px]" itemClassName="focus:bg-[#de5c8e4d] cursor-pointer text-xs sm:text-sm lg:text-base" className="h-[34px] sm:h-[40px] lg:h-[48px] rounded-[6px] text-text-gray text-xs sm:text-sm lg:text-base border-stroke hover:border-primary hover:bg-white hover:text-primary" content={["ใหม่ไปเก่า", "เก่าไปใหม่", "ไล่ตามเดดไลน์"]} icon={up ? <ChevronUp /> : <ChevronDown />} onOpenChange={(open) => {
                setUp(current => !current);
              }}>
                เรียงลำดับ
              </Dropdown>
              <Button className="h-[34px] sm:h-[40px] lg:h-[48px] rounded-[6px] bg-white text-text-gray border-1 text-xs sm:text-sm lg:text-base border-stroke hover:border-primary hover:bg-white hover:text-primary" onClick={() => router.push("/create")}>
                สร้างโพสต์ใหม่
                <SquarePlus />
              </Button>
            </div>
            <SearchBar searchIconClassName="sm:left-4 sm:top-2 lg:top-3 sm:h-6 sm:w-6 h-5 w-5 top-2 left-4" className="max-w-9999" inputClassName="placeholder:text-text-gray h-[34px] sm:h-[40px] lg:h-[48px] lg:text-base sm:text-sm text-xs placeholder:lg:text-base placeholder:sm:text-sm placeholder:text-xs" />
            <Dropdown itemClassName="cursor-pointer text-xs sm:text-sm lg:text-base" className="hidden sm:flex h-[34px] sm:h-[40px] lg:h-[48px] rounded-[6px] text-text-gray text-xs sm:text-sm lg:text-base border-stroke hover:border-primary hover:bg-white hover:text-primary" content={["ใหม่ไปเก่า", "เก่าไปใหม่", "ไล่ตามเดดไลน์"]} icon={up ? <ChevronUp /> : <ChevronDown />} onOpenChange={(open) => {
              setUp(current => !current);
            }}>
              เรียงลำดับ
            </Dropdown>
            <Button className="hidden sm:flex h-[34px] sm:h-[40px] lg:h-[48px] rounded-[6px] bg-white text-text-gray hover:border-primary hover:text-primary border-1 text-xs sm:text-sm lg:text-base border-stroke hover:border-primary hover:bg-white hover:text-primary" onClick={() => router.push("/create")}>
              สร้างโพสต์ใหม่
              <SquarePlus />
            </Button>
          </div>
          {isLoading ? (<div className="w-full h-full flex justify-center items-center">กำลังโหลด...</div>) : (
            <div className="grid ssm:grid-cols-1 ssm:grid-cols-2 ssm:gap-[6px] sm:flex sm:flex-col sm:gap-y-[24px] py-2">
              {(posts ?? []).map((event: any) => (
                <PostCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>
      }
      <Footer />
    </div>
  )
}

export default PostsBoardPage;
