"use client";

import "@/styles/calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import thLocale from "@fullcalendar/core/locales/th";
import type { RefObject } from "@fullcalendar/core/preact.js";

export type eventType = {
  id: number;
  accountName: string;
  profileImage: string;
  image: string;
  title: string;
  description: string;
  themeColor: string;
  closeDate: string;
};

type CalendarProps = {
  locale?: string;
  data: eventType[];
  handleDatesSet?: (dates: any) => void;
};

export default function Calendar({
  locale = "th",
  data,
  handleDatesSet
}: CalendarProps) {
  return (
    <div className="rounded-xl bg-white">
      <FullCalendar
        datesSet={handleDatesSet}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={locale}
        locales={[thLocale]}
        fixedWeekCount={false}
        height="auto"
        headerToolbar={{
          left: "title",
          right: "prev,next",
        }}

        dayCellContent={(arg) => {
          const day = arg.date.getDate();
          return <span>{String(day).padStart(2, "0")}</span>;
        }}

        events={data.map((item) => ({
          id: String(item.id),
          title: item.title,
          date: item.closeDate,
          extendedProps: item,
        }))}

        eventClassNames={() => ["fc-event-none"]}

        eventContent={(arg) => {
          const event = arg.event.extendedProps as eventType;

          return (
            <div
              className="relative flex items-center gap-1 px-1 sm:pl-3 sm:pr-2 sm:py-1"
              style={{ backgroundColor: `${event.themeColor}90` }} // alpha
            >
              <span
                className="absolute left-0 h-full w-0.5 sm:w-1"
                style={{ backgroundColor: event.themeColor }}
              />
              <span className="sm:text-[10px] truncate">
                {arg.event.title}
              </span>
            </div>
          );
        }}
      />
    </div>
  );
}
