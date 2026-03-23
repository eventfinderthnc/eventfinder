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

type DatePickerProps = {
    value?: Date
    onChange?: (date: Date) => void
}

export function DatePicker({ value: controlled, onChange }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(controlled)
  React.useEffect(() => {
    if (controlled !== undefined) setDate(controlled)
  }, [controlled])
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="h-12 rounded-md border-[#D6D6D6] hover:border-primary/70 hover:bg-transparent px-3 justify-start text-left py-auto"
          >
            <span className={cn(
                "text-sm",
                date ? "text-foreground" : "text-muted-foreground")}>
                {date ? formatDate(date) : "วัน/เดือน/ปี"}        
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
              if (date) {
                onChange?.(date)
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
