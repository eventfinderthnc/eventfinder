"use client"

import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  BriefcaseBusiness,
  Cpu,
  HeartPulse,
  Volleyball,
  HandHeart,
  Monitor,
  Palette,
  Music,
  GraduationCap,
} from "lucide-react"

type Category = {
  id: string
  label: string
  icon: React.ElementType
}

const categories: Category[] = [
  { id: "business", label: "ธุรกิจ", icon: BriefcaseBusiness },
  { id: "technology", label: "เทคโนโลยี", icon: Cpu },
  { id: "medical", label: "แพทย์", icon: HeartPulse },
  { id: "sport", label: "กีฬา", icon: Volleyball },
  { id: "community", label: "พัฒนาชุมชน", icon: HandHeart },
  { id: "it", label: "สารสนเทศ", icon: Monitor },
  { id: "art", label: "ศิลปะ", icon: Palette },
  { id: "music", label: "ดนตรี", icon: Music },
  { id: "education", label: "การศึกษา", icon: GraduationCap },
]

export default function Page() {
  
  const [selected, setSelected] = useState<string[]>([])
  const router = useRouter()

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    )
  }

  const canContinue = selected.length > 0

  return (
    <div className="auth-section">
      <div className="flex flex-col items-center justify-between p-10 w-[320px] h-[510px] sm:w-[550px] sm:h-[660px] shadow-[0_6px_16px_0_rgba(0,0,0,0.25)] rounded-4xl bg-white">

        {/* Header */}
        <div className="w-full flex justify-between items-center">
            <ArrowLeft 
                className="text-text-gray hover:text-text-gray-hover transition cursor-pointer" 
                onClick={() =>
                    router.push("/auth/organizer/onboarding/contact")
                }
            />
          <h1 className="text-xl sm:text-2xl">เลือกหมวดหมู่</h1>
          <ArrowLeft className="text-white" />
        </div>

        {/* Categories */}
        <div className="w-fit grid grid-cols-3 gap-y-4 gap-x-4 sm:gap-y-6 sm:gap-x-6 text-sm sm:text-base">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isSelected = selected.includes(cat.id)

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleSelect(cat.id)}
                className="flex flex-col gap-2 items-center focus:outline-none cursor-pointer"
              >
                <div
                  className={`
                    p-4 rounded-full border-2
                    ${
                      isSelected
                        ? "bg-primary border-primary"
                        : "bg-white border-primary"
                    }
                  `}
                >
                  <Icon
                    className={`
                      w-5 h-5 sm:w-6 sm:h-6 
                      ${isSelected ? "text-white" : "text-primary"}
                    `}
                  />
                </div>
                <p>{cat.label}</p>
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-6 w-full">
          <Button
            className="w-full text-sm sm:text-base"
            disabled={!canContinue}
          >
            ยืนยัน
          </Button>

          <div className="w-full items-center justify-center flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4d4d4]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4d4d4]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#949494]" />
          </div>
        </div>
      </div>
    </div>
  )
}