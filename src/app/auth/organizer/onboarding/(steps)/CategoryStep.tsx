import { useState } from "react"
import { Button } from "@/components/ui/Button"
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

const categories = [
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

export default function CategoryStep({
    onBack,
}: {
    onBack: () => void
}) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    )
  }

  const canContinue = selected.length > 0

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex justify-between items-center">
        <ArrowLeft
          className="cursor-pointer text-text-gray hover:text-text-gray-hover"
          onClick={onBack}
        />
        <h1 className="text-xl sm:text-2xl">เลือกหมวดหมู่</h1>
        <ArrowLeft className="text-white" />
      </div>

      <div className="grid grid-cols-3 gap-4 sm:gap-6 text-sm sm:text-base mx-auto">
        {categories.map((c) => {
          const Icon = c.icon
          const active = selected.includes(c.id)

          return (
            <button
              key={c.id}
              onClick={() => toggle(c.id)}
              className="flex flex-col items-center gap-2"
            >
              <div
                className={`p-4 rounded-full border-2 ${
                  active ? "bg-primary border-primary" : "border-primary"
                }`}
              >
                <Icon
                  className={`w-5 sm:w-6 h-5 sm:h-6 ${
                    active ? "text-white" : "text-primary"
                  }`}
                />
              </div>
              <p>{c.label}</p>
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-4">

        <Button disabled={!canContinue}>
            เสร็จสิ้น
        </Button>

        <div className="w-full items-center justify-center flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4d4d4]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4d4d4]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#949494]" />
        </div>
      </div>
    </div>
  )
}