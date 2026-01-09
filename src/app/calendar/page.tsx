import Calendar from '@/components/ui/Calendar'
import React from 'react'
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Trash2 } from 'lucide-react';

const CalendarPage = () => {

    function getRemainingTime(closeDate: string) {
        const diff = new Date(closeDate).getTime() - Date.now();
        if (diff <= 0) return "ปิดรับสมัครแล้ว";

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);

        return `เหลือเวลา ${hours} ชั่วโมง ${minutes} นาที`;
    }

    const data = [
        {
            id: 1,
            accountName: "Thinc.",
            profileImage: "/images/thinc-profile.png",
            image: "/images/thinc-recruitment.png",
            title: "Thinc. Recruitment Timeline",
            description:
            "Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา",
            themeColor: "#DF5C8E",
            closeDate: "2025-12-25T23:59:00+07:00",
        },
        {
            id: 2,
            accountName: "Thinc.",
            profileImage: "/images/thinc-profile.png",
            image: "/images/thinc-recruitment.png",
            title: "Thinc. Recruitment Timeline",
            description:
            "Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา",
            themeColor: "#DF5C8E",
            closeDate: "2025-12-25T23:59:00+07:00",
        },
        {
            id: 3,
            accountName: "Thinc.",
            profileImage: "/images/thinc-profile.png",
            image: "/images/thinc-recruitment.png",
            title: "Thinc. Recruitment Timeline",
            description:
            "Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา",
            themeColor: "#DF5C8E",
            closeDate: "2025-12-25T23:59:00+07:00",
        },
        {
            id: 4,
            accountName: "Thinc.",
            profileImage: "/images/thinc-profile.png",
            image: "/images/thinc-recruitment.png",
            title: "Thinc. Recruitment Timeline",
            description:
            "Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา",
            themeColor: "#DF5C8E",
            closeDate: "2025-12-25T23:59:00+07:00",
        },
        {
            id: 5,
            accountName: "Thinc.",
            profileImage: "/images/thinc-profile.png",
            image: "/images/thinc-recruitment.png",
            title: "Thinc. Recruitment Timeline",
            description:
            "Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา",
            themeColor: "#DF5C8E",
            closeDate: "2025-12-25T23:59:00+07:00",
        },
        {
            id: 6,
            accountName: "Thinc.",
            profileImage: "/images/thinc-profile.png",
            image: "/images/thinc-recruitment.png",
            title: "Thinc. Recruitment Timeline",
            description:
            "Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา",
            themeColor: "#DF5C8E",
            closeDate: "2025-12-25T23:59:00+07:00",
        },
        {
            id: 7,
            accountName: "Thinc.",
            profileImage: "/images/thinc-profile.png",
            image: "/images/thinc-recruitment.png",
            title: "Thinc. Recruitment Timeline",
            description:
            "Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา",
            themeColor: "#DF5C8E",
            closeDate: "2025-12-25T23:59:00+07:00",
        },
        {
            id: 8,
            accountName: "Thinc.",
            profileImage: "/images/thinc-profile.png",
            image: "/images/thinc-recruitment.png",
            title: "Thinc. Recruitment Timeline",
            description:
            "Thinc. 2025 Core Team Recruitment นักศึกษาจุฬาฯ ทุกคณะ ทุกปี ที่อยากสร้าง Product จริง, สนใจ Tech & Startup, และพร้อมเติบโตไปกับ Team ของเรา",
            themeColor: "#DF5C8E",
            closeDate: "2025-12-25T23:59:00+07:00",
        },
    ]

    return (
        <div>
            <Navbar />
            <section className="body-section">
                <div className="flex flex-col gap-4 sm:gap-5 
                                lg:grid lg:grid-cols-[4fr_3fr] lg:gap-8 w-full">

                    {/* LEFT — Sticky on Desktop */}
                    <div className="flex flex-col gap-3 sm:gap-5
                                    lg:sticky lg:top-5 lg:self-start">
                        <h1>ปฏิทินของฉัน</h1>
                        <Calendar data={data} />
                    </div>

                    {/* RIGHT — Scroll normally */}
                    <div className="flex flex-col gap-4 sm:gap-5">
                        <h1 className="text-xl sm:text-2xl lg:text-[28px] lg:h-[42px] lg:text-white">
                            รายการปฏิทินของฉัน
                        </h1>

                        <div className="w-full flex flex-col gap-4">
                            {data.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex p-2.5 gap-5 rounded-xl sm:p-4 sm:rounded-2xl
                                                border border-stroke bg-white"
                                >
                                    {/* Poster */}
                                    <div className="hidden sm:flex h-[150px] w-[110px] bg-primary rounded-xl" />

                                    {/* Content */}
                                    <div className="flex flex-1 flex-col gap-5 sm:justify-between">
                                        <div className="flex flex-col gap-1.5 h-full">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="h-6 w-6 rounded-full bg-primary" />
                                                    <span className="text-xs sm:text-sm">
                                                        {item.accountName}
                                                    </span>
                                                </div>

                                                <Trash2 className="text-text-gray w-4 h-4 sm:w-6 sm:h-6 hover:text-red-600" />
                                            </div>

                                            <h2 className="text-sm sm:text-base font-semibold">
                                                {item.title}
                                            </h2>

                                            <p className="text-text-gray text-[10px] sm:text-xs font-light
                                                            line-clamp-2 sm:line-clamp-3">
                                                {item.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] sm:text-xs text-gray-700">
                                                <span className="font-semibold">ปิดรับสมัคร : </span>
                                                {new Date(item.closeDate).toLocaleDateString("th-TH", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </span>

                                            <span className="text-[10px] sm:text-xs font-semibold text-red-500">
                                                {getRemainingTime(item.closeDate)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default CalendarPage