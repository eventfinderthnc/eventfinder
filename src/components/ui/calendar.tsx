"use client";

import "@/styles/calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import thLocale from "@fullcalendar/core/locales/th";

type CalendarProps = {
  locale?: string;
};

export default function Calendar({
    locale = "th" 
}: CalendarProps) {
  return (
    <div className="rounded-xl bg-white">
      <FullCalendar
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
        events={[
          {
            title: "Thinc. Recruitment",
            date: "2025-12-19",

          },
        ]}
        eventClassNames={() => ["fc-event-none"]}
        eventContent={(arg) => (
            <div className="relative flex items-center gap-1 bg-gray-600/60 pl-3 pr-2 py-1">
                <span className="absolute h-full w-1 bg-gray-600 left-0" />
                <span className="text-[10px]">{arg.event.title}</span>
            </div>
        )}
      />
    </div>
  );
}