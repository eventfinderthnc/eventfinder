"use client"

import * as React from "react"
import { Button } from "@/components/ui/Button"
import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function TimePicker() {
    const [date, setDate] = React.useState<Date>();
    const [open, setOpen] = React.useState(false);
    const hoursArray = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutesArray = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60"]

    const getBaseDate = () => {
        const d = new Date();
        d.setHours(0, 0, 0, 0); // set default time to 12:00 AM
        return d;
    };

    const handleTimeChange = (
        type: "hour" | "minute" | "ampm",
        value: string
        ) => {
        const baseDate = date ?? getBaseDate();
        const newDate = new Date(baseDate);

        if (type === "hour") {
            const hour = parseInt(value) % 12;
            const isPM = newDate.getHours() >= 12;
            newDate.setHours(hour + (isPM ? 12 : 0));
        }

        if (type === "minute") {
            newDate.setMinutes(parseInt(value));
        }

        if (type === "ampm") {
            const hours = newDate.getHours();
            if (value === "PM" && hours < 12) newDate.setHours(hours + 12);
            if (value === "AM" && hours >= 12) newDate.setHours(hours - 12);
        }

        setDate(newDate);
    };

    return (
        <div className={cn("mt-8.5 flex min-w-full")}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="h-12 min-w-full rounded-md border-[#D6D6D6] hover:bg-[#DE5C8E] px-3 justify-start text-left pt-2.5"
                    >
                        <span className={cn(
                            "text-sm",
                            date ? "text-foreground" : "text-muted-foreground")}>
                            {date ? format(date, "hh:mm a") : "เวลา"}        
                        </span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                        <ScrollArea className="w-64 sm:w-auto">
                            <div className="flex sm:flex-col p-2">
                                {hoursArray.map((hour) => (
                                <Button
                                    key={hour}
                                    size="icon"
                                    variant={
                                    date && date.getHours() % 12 === hour % 12
                                        ? "default"
                                        : "ghost"
                                    }
                                    className="sm:w-full shrink-0 aspect-square"
                                    onClick={() => handleTimeChange("hour", hour.toString())}
                                >
                                    {hour}
                                </Button>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" className="sm:hidden" />
                        </ScrollArea>
                        <ScrollArea className="w-64 sm:w-auto">
                            <div className="flex sm:flex-col p-2">
                                {minutesArray.map((minute) => (
                                    <Button
                                        key={minute}
                                        size="icon"
                                        variant={
                                            date && date.getMinutes() === parseInt(minute)
                                                ? "default"
                                                : "ghost"
                                        }
                                        className="sm:w-full shrink-0 aspect-square"
                                        onClick={() =>
                                        handleTimeChange("minute", minute.toString())
                                        }
                                    >
                                        {minute}
                                    </Button>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" className="sm:hidden" />
                        </ScrollArea>
                        <ScrollArea className="">
                            <div className="flex sm:flex-col p-2">
                                {["AM", "PM"].map((ampm) => (
                                <Button
                                    key={ampm}
                                    size="icon"
                                    variant={
                                    date &&
                                    ((ampm === "AM" && date.getHours() < 12) ||
                                        (ampm === "PM" && date.getHours() >= 12))
                                        ? "default"
                                        : "ghost"
                                    }
                                    className="sm:w-full shrink-0 aspect-square"
                                    onClick={() => handleTimeChange("ampm", ampm)}
                                >
                                    {ampm}
                                </Button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}