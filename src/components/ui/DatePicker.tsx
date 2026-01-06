"use client"

import * as React from "react"

import { Button } from "@/components/ui/Button"
import { CalendarDatePicker } from "@/components/ui/CalendarDatePicker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { cn } from "@/lib/utils"

export function DatePicker() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="h-12 rounded-md border-[#D6D6D6] hover:bg-[#DE5C8E] px-3 justify-start text-left py-auto"
          >
            <span className={cn(
                "text-sm",
                date ? "text-foreground" : "text-muted-foreground")}>
                {date ? date.toLocaleDateString() : "วัน/เดือน/ปี"}        
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <CalendarDatePicker
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
