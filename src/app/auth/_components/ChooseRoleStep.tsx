"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import clsx from "clsx"

type Role = "attendee" | "organizer"

export default function ChooseRoleStep({
  onBack,
  onNext,
}: {
  onBack: () => void
  onNext: (role: Role) => void
}) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  return (
    <div className="flex flex-col h-full justify-between pb-12">
      {/* Header */}
      <div className="flex justify-between items-center">
        <ArrowLeft
          onClick={onBack}
          className="cursor-pointer text-text-gray hover:text-text-gray-hover"
        />
        <h1 className="text-xl sm:text-2xl">คำถามก่อนเข้าสู่ระบบ</h1>
        <ArrowLeft className="text-white" />
      </div>

      {/* Role selection */}
      <div className="w-full flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
        {/* Attendee */}
        <button
          type="button"
          onClick={() => setSelectedRole("attendee")}
          className={clsx(
            "shadow-[0_0_10px_0_rgba(0,0,0,0.2)] w-full sm:w-auto px-6 sm:px-12 py-6 sm:py-12 rounded-4xl flex flex-row sm:flex-col justify-center items-center gap-4 sm:gap-8 transition",
            selectedRole === "attendee"
              ? "text-black ring-2 ring-primary/80 scale-[1.02]"
              : "hover:scale-[1.02] text-text-gray"
          )}
        >
          <Image
            src="/images/svg/attendee_auth.svg"
            alt="attendee"
            width={120}
            height={120}
            className="w-[64px] h-[64px] sm:w-[120px] sm:h-[120px]"
          />
          <span className="text-base sm:text-[18px] font-medium">
            ผู้เข้าร่วมกิจกรรม
          </span>
        </button>

        {/* Organizer */}
        <button
          type="button"
          onClick={() => setSelectedRole("organizer")}
          className={clsx(
            "shadow-[0_0_10px_0_rgba(0,0,0,0.2)] w-full sm:w-auto px-6 sm:px-12 py-6 sm:py-12 rounded-4xl flex flex-row sm:flex-col justify-center items-center gap-4 sm:gap-8 transition",
            selectedRole === "organizer"
              ? "text-black ring-2 ring-primary/80 scale-[1.02]"
              : "hover:scale-[1.02] text-text-gray"
          )}
        >
          <Image
            src="/images/svg/organizer_auth.svg"
            alt="organizer"
            width={120}
            height={120}
            className="w-[64px] h-[64px] sm:w-[120px] sm:h-[120px]"
          />
          <span className="text-base sm:text-[18px] font-medium">
            ผู้จัดกิจกรรม
          </span>
        </button>
      </div>

      {/* Confirm */}
      <Button
        disabled={!selectedRole}
        onClick={() => {
          if (!selectedRole) return
          onNext(selectedRole)
        }}
      >
        ถัดไป
      </Button>
    </div>
  )
}