"use client"

import Calendar from '@/components/ui/Calendar'
import React, { useEffect, useRef, useState } from 'react'
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Trash2 } from 'lucide-react';
import { api } from '@/trpc/react';
import { useSession } from '@/lib/auth-client';
import { ConfirmModal } from '@/components/modal/ConfirmModal';
import FullCalendar from '@fullcalendar/react';
import { setDefaultAutoSelectFamily } from 'net';
import { date } from 'better-auth';
import { create } from 'domain';

const themeColor = ["#DF5C8E", "#4369c1", "#c16ddd", "#e7935f", "#5cc27e", "#e0e05b", "#5bc0eb", "#9bc53d", "#fdb462", "#ef3b2c"];

const CalendarPage = () => {

    // This is important!
    // When we query the date from the database, it looks like the time is 7 hours behind the actual time.
    // So we plus the timezone offset to the date to make it correct.
    function getRemainingTime(closeDate: Date) {
        const diff = closeDate.getTime() - Date.now();
        if (diff <= 0) return "ปิดรับสมัครแล้ว";

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);

        return `เหลือเวลา ${hours} ชั่วโมง ${minutes} นาที`;
    }

    // Handle user changes calendar page
    const [dates, setDates] = useState<[Date, Date]>([new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), new Date(new Date().getFullYear(), new Date().getMonth(), 0, 23, 59, 59)]);
    
    const handleDatesSet = (updatedDates: any) => {
      // This conditions prevent infinite reloading of calendar.
      if(dates[0].getTime() !== updatedDates.start.getTime() || dates[1].getTime() !== updatedDates.end.getTime()) {
        setDates([updatedDates.start, updatedDates.end]);
      }
    }

    // Fetching Data
    const { data: session } = useSession();
    const { data: fetchedData, isLoading, error } = api.calendarItem.getAllByUserId.useQuery({
      userId: session?.user.id || ""
    }, {
      enabled: !!session?.user.id
    });

    // Masking Data
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
      setData(fetchedData?.map((item: any, index: number) => {
        return {
          id: item.id,
          accountName: item.name,
          profileImage: item.userImage,
          image: item.image,
          title: item.title,
          description: item.description,
          themeColor: themeColor[index % themeColor.length],
          closeDate: new Date(item.date.getTime() + new Date(item.date).getTimezoneOffset() * 60 * 1000), // This is important! See getRemainingTime function for more details.
        };
      }) ?? []);
    }, [isLoading]);

    const [filteredData, setFilteredData] = useState<any[]>([]);

    useEffect(() => {
      setFilteredData(data.filter(item => {
        return item.closeDate >= dates[0] && item.closeDate <= dates[1];
      }));
    }, [dates, data, isLoading]);


    // Deleting Data
    const [showDeleteModal, setShowDeleteModal] = useState<[boolean, string]>([false, ""]);
    const deleteMutation = api.calendarItem.delete.useMutation();

    return (
        <div>
            <ConfirmModal
              open={showDeleteModal[0]} 
              onConfirm={
                () => {
                  deleteMutation.mutate({ id: showDeleteModal[1] });
                  setData(prev => prev.filter(i => i.id !== showDeleteModal[1]));
                  setShowDeleteModal([false, ""]);
                }
              }
              onCancel={
                () => {
                  setShowDeleteModal([false, ""]);
                }
              }
            />
            <Navbar />
            <section className="body-section">
                <div className="flex flex-col gap-4 sm:gap-5 
                                lg:grid lg:grid-cols-[4fr_3fr] lg:gap-8 w-full">

                    {/* LEFT — Sticky on Desktop */}
                    <div className="flex flex-col gap-3 sm:gap-5
                                    lg:sticky lg:top-5 lg:self-start">
                        <h1>ปฏิทินของฉัน</h1>
                        <Calendar data={filteredData} handleDatesSet={handleDatesSet} />
                    </div>

                    {/* RIGHT — Scroll normally */}
                    <div className="flex flex-col gap-4 sm:gap-5">
                        <h1 className="text-xl sm:text-2xl lg:text-[28px] lg:h-[42px] lg:text-white">
                            รายการปฏิทินของฉัน
                        </h1>
                        {
                          filteredData.length === 0 && !isLoading ? (
                            <div className="flex items-center justify-center h-full text-text-gray">
                              ไม่มีรายการที่ท่านบันทึกไว้
                            </div>
                          ) : (

                            <div className="w-full flex flex-col gap-4">
                                {filteredData.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex p-2.5 gap-5 rounded-xl sm:p-4 sm:rounded-2xl
                                                    border border-stroke bg-white"
                                    >
                                        {/* Poster */}
                                        {/* <div className="hidden sm:flex h-[150px] w-[110px] bg-primary rounded-xl" /> */}
                                  
                                        <img src={item.image} className="hidden sm:flex h-[150px] w-[110px] rounded-xl object-cover object-center" />

                                        {/* Content */}
                                        <div className="flex flex-1 flex-col gap-5 sm:justify-between">
                                            <div className="flex flex-col gap-1.5 h-full">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5">
                                                        {/* <div className="h-6 w-6 rounded-full bg-primary" /> */}
                                                        <img src={item.profileImage} className="h-6 w-6 rounded-full object-cover object-center" />
                                                        <span className="text-xs sm:text-sm">
                                                            {item.accountName}
                                                        </span>
                                                    </div>

                                                    <Trash2 className="text-text-gray w-4 h-4 sm:w-6 sm:h-6 hover:text-red-600" onClick={() => setShowDeleteModal([true, item.id])}/>
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
                                                    {item.closeDate.toLocaleDateString("th-TH", {
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
                          )
                        }
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default CalendarPage