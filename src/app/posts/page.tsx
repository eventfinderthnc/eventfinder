"use client";

import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { SearchBar } from "@/components/ui/SearchBar";
import { ChevronDown, SquarePlus, SquarePen, Trash2, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

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

  return (
    <section className="body-section gap-[1px] sm:gap-3">
      <div className="text-primary font-[600] text-[24px] sm:text-[28px]">
        โพสต์ของฉัน
      </div>
      <div className="flex flex-col items-end sm:flex-row items-center gap-y-2 sm:gap-x-4">
        <div className="sm:hidden flex gap-x-2">
          <Dropdown menuContentClassName="w-[30px]" itemClassName="focus:bg-[#de5c8e4d] cursor-pointer text-xs sm:text-sm lg:text-base" className="h-[34px] sm:h-[40px] lg:h-[48px] rounded-[6px] text-text-gray text-xs sm:text-sm lg:text-base border-stroke hover:border-primary hover:bg-white hover:text-primary" content={["ใหม่ไปเก่า", "เก่าไปใหม่", "ไล่ตามเดดไลน์"] } icon={up? <ChevronUp /> : <ChevronDown />} onOpenChange={(open) => {
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
        <Dropdown itemClassName="cursor-pointer text-xs sm:text-sm lg:text-base" className="hidden sm:flex h-[34px] sm:h-[40px] lg:h-[48px] rounded-[6px] text-text-gray text-xs sm:text-sm lg:text-base border-stroke hover:border-primary hover:bg-white hover:text-primary" content={["ใหม่ไปเก่า", "เก่าไปใหม่", "ไล่ตามเดดไลน์"] } icon={up? <ChevronUp /> : <ChevronDown />} onOpenChange={(open) => {
            setUp(current => !current);
          }}>
          เรียงลำดับ
        </Dropdown>
        <Button className="hidden sm:flex h-[34px] sm:h-[40px] lg:h-[48px] rounded-[6px] bg-white text-text-gray hover:border-primary hover:text-primary border-1 text-xs sm:text-sm lg:text-base border-stroke hover:border-primary hover:bg-white hover:text-primary" onClick={() => router.push("/create")}>
          สร้างโพสต์ใหม่
          <SquarePlus />
        </Button>
      </div>
      <div className="grid ssm:grid-cols-1 ssm:grid-cols-2 ssm:gap-[6px] sm:flex sm:flex-col sm:gap-y-[24px] py-2">
        {
          data.map((event: Data) => {
            const date = new Date(event.closeDate);
            const formatter = Intl.DateTimeFormat("th-TH", {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
            const closeDate = formatter.format(date);
            return (
              <div key={event.id} className="border-1 border-stroke rounded-[12px] py-[10px] px-[10px] lg:py-5 lg:px-6 h-[358px] sm:h-[213px] lg:h-[266px] flex sm:flex-row flex-col justify-center sm:gap-x-5 gap-y-[10px]">
                <div className="h-[191px] w-full sm:h-[190px] lg:h-[226px] sm:w-42.5 rounded-[12px] bg-primary shrink-0">
                  {/* <img className="h-full w-full object-cover rounded-[12px]" src={event.profileImage}></img> */}
                </div>
                <div className="h-[150px] sm:h-[193px] lg:h-[226px] flex-1 flex flex-col justify-between">
                  <div className="flex flex-col gap-y-[5px]">
                    <div>
                      <div className="flex items-center gap-x-2 sm:gap-x-0 sm:justify-between">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-4">
                          <div className="font-semibold lg:text-xl sm:text-lg text-xs text-base line-clamp-1 sm:line-clamp-2">{event.title}</div>
                          <div className="items-center text-primary gap-x-2 flex">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            <div className="font-semibold text-xs sm:text-sm lg:text-base">Recruitment</div>
                          </div>
                        </div>
                        <div className="text-text-gray flex gap-x-3">
                          <SquarePen className="hidden sm:block hover:cursor-pointer lg:w-6 lg:h-6 sm:w-5 sm:h-5" />
                          <Trash2 className="hidden sm:block hover:cursor-pointer hover:text-red-600 hover:opacity-80 lg:w-6 lg:h-6 sm:w-5 sm:h-5" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-x-2 gap-y-0.75 text-[0.75rem] h-[22px] sm:h-[26px] items-center text-white flex-wrap overflow-hidden">
                      {
                        event.tags.map((tag, idx) => {
                          return (
                            <div key={idx} className="text-[8px] sm:text-xs px-2 sm:px-2.5 py-1 rounded-[6px] shrink-0" style={{backgroundColor: tagColor[tag]}}>{ tag }</div>
                          );
                        })
                      }
                    </div>
                    <div className="hidden mt-1 text-text-gray line-clamp-3 sm:line-clamp-3 lg:line-clamp-5 text-[10px] sm:text-sm lg:text-base font-light tracking-tight">
                      { event.description }
                    </div>
                  </div>
                  <div className="flex-col lg:flex-row flex justify-between lg:text-base sm:text-[13px] text-[8px]">
                    <div className="hidden sm:flex justify-between">
                      <div className="flex gap-1">
                        <span className="font-semibold shrink-0">ฟอร์มรับสมัคร : </span>
                        <Link href={event.formLink} target="_blank" className="text-text-gray truncate hover:underline">{ event.formLink }</Link>
                        {/* <span className="text-text-gray text-[0.75rem] sm:text-[1rem] truncate">{ event.formLink }</span> */}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex gap-1 truncate">
                        <span className="font-semibold shrink-0">ปิดรับสมัคร : </span>
                        <span className="text-text-gray truncate">{ closeDate }</span>
                      </div>            
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-1 sm:hidden"> 
                    <button className="w-full h-[24px] text-[10px] text-text-light-gray flex justify-center items-center rounded-[4px] border-stroke border-1 cursor-pointer hover:bg-[#f2f2f2] hover:text-text-gray">แก้ไข</button>
                    <button className="w-full h-[24px] text-[10px] text-text-light-gray flex justify-center items-center rounded-[4px] border-stroke border-1 cursor-pointer hover:text-red-500 hover:border-red-500">ลบทิ้ง</button>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </section>
  )
}

export default PostsBoardPage;
