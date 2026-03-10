"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface FileInputProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  placeholder?: string
  onFileSelect?: (file: File | null, previewUrl: string) => void
}

function FileInput({
  className,
  placeholder = "Choose a file",
  onChange,
  onFileSelect,
  ...props
}: FileInputProps) {
  const [fileName, setFileName] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFileName(file ? file.name : "")
    
    let previewUrl = ""
    if (file) {
      previewUrl = URL.createObjectURL(file)
    }
    
    onFileSelect?.(file ?? null, previewUrl)
    onChange?.(e)
  }

  return (
    <label
      className={cn(
        "flex items-center h-9 w-full cursor-pointer rounded-md border border-input bg-transparent px-3 text-sm text-muted-foreground shadow-xs",
        "hover:bg-primary/90",
        className
      )}
    >
      <span className="hidden lg:flex">
        {placeholder || "เปลี่ยนรูปภาพ"}
      </span>
      <span className="flex lg:hidden">เปลี่ยนรูปภาพ</span>
      <input
        type="file"
        className="hidden"
        onChange={handleChange}
        accept="image/*"
        {...props}
      />
    </label>
  )
}

export { FileInput }