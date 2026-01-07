import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { SearchBar } from "@/components/ui/SearchBar";
import type { string } from "better-auth";
import { ChevronDown, SquarePlus, SquarePen, Trash2 } from "lucide-react";

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

const tagColor: {
  [key: string]: string
} = {
  "Tech": "#4369c1",
  "UX/UI": "#c16ddd",
  "Marketing": "#e7935f",
};

const PostsBoardPage = () => {
  return (
    <section className="body-section">
      <div className="text-primary font-[600] text-[28px]">
        โพสต์ของฉัน
      </div>
      <div className="flex items-center gap-x-4">
        <SearchBar className="max-w-9999" />
        <Dropdown className="h-12 rounded-[6px] text-text-gray text-[16px] border-border" panelLabel="เลือก 1 อย่าง" content={["ใหม่ไปเก่า", "เก่าไปใหม่", "ไล่ตามเดดไลน์"] } icon={<ChevronDown />}>
          เรียงลำดับ
        </Dropdown>
        <Button className="h-12 rounded-[6px] bg-white text-text-gray hover:bg-accent hover:text-white border-1 text-[16px] border-border">
          สร้างโพสต์ใหม่
          <SquarePlus />
        </Button>
      </div>
      <div className="flex flex-col gap-y-[24px] py-2">
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
              <div key={event.id} className="border-1 border-border rounded-[12px] py-5 px-6 h-65.5 flex gap-x-5">
                <div className="h-56.5 w-42.5 rounded-[12px] bg-primary shrink-0">
                  {/* <img className="h-full w-full object-cover rounded-[12px]" src={event.profileImage}></img> */}
                </div>
                <div className="h-56.5 flex-1 flex flex-col justify-between">
                  <div className="flex flex-col gap-y-[5px]">
                    <div>
                      <div className="flex items-center gap-x-2 sm:gap-x-0 sm:justify-between">
                        <div className="flex items-center gap-x-4">
                          <div className="font-[600] sm:text-[1.25rem] text-[1rem] line-clamp-2">{event.title}</div>
                          <div className="items-center text-primary gap-x-2 hidden md:flex">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            <div className="font-[600] sm-none">Recruitment</div>
                          </div>
                        </div>
                        <div className="text-text-gray flex gap-x-3">
                          <SquarePen className="hover:cursor-pointer " />
                          <Trash2 className="hover:cursor-pointer hover:text-red-600 hover:opacity-80" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-x-2 gap-y-0.75 text-[0.75rem] text-white flex-wrap">
                      {
                        event.tags.map((tag, idx) => {
                          return (
                            <div key={idx} className="px-1 sm:px-2.5 py-1 rounded-[6px] shrink-0" style={{backgroundColor: tagColor[tag]}}>{ tag }</div>
                          );
                        })
                      }
                    </div>
                    <div className="mt-1 text-text-gray line-clamp-5 sm:line-clamp-4 text-[0.75rem] sm:text-[1rem] font-light tracking-tight">
                      { event.description }
                    </div>
                  </div>
                  <div className="flex-col lg:flex-row flex justify-between">
                    <div className="flex justify-between">
                      <div className="flex gap-1">
                        <span className="font-semibold shrink-0 text-[0.75rem] sm:text-[1rem]">ฟอร์มรับสมัคร : </span>
                        <span className="text-text-gray text-[0.75rem] sm:text-[1rem] truncate">{ event.formLink }</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex gap-1 truncate">
                        <span className="font-semibold shrink-0 text-[0.75rem] sm:text-[1rem]">ปิดรับสมัคร : </span>
                        <span className="text-text-gray text-[0.75rem] sm:text-[1rem] truncate">{ closeDate }</span>
                      </div>            
                    </div>
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
