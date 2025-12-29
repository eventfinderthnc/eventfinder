import { Button } from "@/components/ui/Button"
import { FormInput } from "@/components/ui/FormInput"
import { Input } from "@/components/ui/Input"
import { ArrowLeft } from "lucide-react"
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ContactStep({
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
          className="cursor-pointer text-text-gray hover:text-text-gray-hover" 
          onClick={onBack}
        />
        <h1 className="text-xl sm:text-2xl">ข้อมูลติดต่อ</h1>
        <ArrowLeft className="text-white" />
      </div>

      <div className="flex flex-col justify-center sm:justify-between items-center my-5 gap-y-10">
        <div className="w-[253px] h-[148.5px] hidden sm:block">
          <img src="/images/svg/undraw_hello_ccwj_2.svg" className="w-full h-full" />
        </div>
        <div className="w-full flex flex-col gap-y-3">
          <div className="relative">
            <div className="flex">
              <Icon icon="mdi:instagram" className="text-[1.6rem] text-[#b3b3b3] absolute bottom-2 left-2" />
              <span className="text-[#b3b3b3] absolute bottom-2 left-9">:</span>
            </div>
            <FormInput label="Instagram" className="h-10 pl-12 text-text-gray bborder-stroker" />
          </div>
          <div className="relative">
            <div className="flex">
              <Icon icon="ic:baseline-facebook" className="text-[1.6rem] text-[#b3b3b3] absolute bottom-2 left-2" />
              <span className="text-[#b3b3b3] absolute bottom-2 left-9">:</span>
            </div>
            <FormInput label="Facebook" className="h-10 pl-12 text-text-gray border-stroke" />
          </div>
          <div className="relative">
            <div className="flex">
              <Icon icon="ic:outline-email" className="text-[1.6rem] text-[#b3b3b3] absolute bottom-2 left-2" />
              <span className="text-[#b3b3b3] absolute bottom-2 left-9">:</span>
            </div>
            <FormInput label="Email" className="h-10 pl-12 text-text-gray border-stroke" />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 w-full">
        <Button className="w-full hover:cursor-pointer" onClick={onNext}>
          ถัดไป
        </Button>

        <div className="w-full items-center justify-center flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#d4d4d4]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#949494]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#d4d4d4]" />
        </div>
      </div>
    </div>
  )
}