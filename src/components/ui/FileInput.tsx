"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface FileInputProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  placeholder?: string
}

function FileInput({
  className,
  placeholder = "Choose a file",
  onChange,
  ...props
}: FileInputProps) {
  const [fileName, setFileName] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFileName(file ? file.name : "")
    onChange?.(e)
  }

  return (
    <label
      className={cn(
        "flex items-center h-9 w-full cursor-pointer rounded-md border border-input bg-transparent px-3 text-sm text-muted-foreground shadow-xs",
        "hover:bg-accent/30",
        className
      )}
    >
      <span>
        {fileName || placeholder}
      </span>

      <input
        type="file"
        className="hidden"
        onChange={handleChange}
        {...props}
      />
    </label>
  )
}

export { FileInput }