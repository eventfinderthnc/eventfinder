import { Button } from "@/components/ui/Button"
import { ArrowLeft } from "lucide-react"

export default function InfoStep({
    onBack,
    onNext,
}: {
    onBack: () => void
    onNext: () => void
}) {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex justify-between items-center">
        <ArrowLeft
          onClick={onBack}
          className="cursor-pointer text-text-gray hover:text-text-gray-hover"
        />
        <h1 className="text-xl sm:text-2xl">กรอกข้อมูลชมรม</h1>
        <ArrowLeft className="text-white" />
      </div>

      

      <div className="flex flex-col gap-4 w-full items-center">
        <Button 
          className="w-full"
          onClick={onNext}
        >
          ถัดไป
        </Button>

        <div className="w-full items-center justify-center flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#949494]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#d4d4d4]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#d4d4d4]" />
          </div>
      </div>

    </div>
  )
}