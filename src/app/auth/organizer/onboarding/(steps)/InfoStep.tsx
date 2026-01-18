"use client";

import { Button } from "@/components/ui/Button"
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react"
import { Icon } from "@iconify/react"
import { FormInput } from "@/components/ui/FormInput"
import { Dropdown } from "@/components/ui/Dropdown"
import { Input } from "@/components/ui/Input"
import useImageUploadHook from "@/lib/hooks/useImageUpload";
import { useState } from "react";

const faculties: string[] = [
  "Allied Health Sciences", "Architecture", "Arts", "Commerce and Accountancy", "Communication Arts", "Dentistry", "Economics", "Education", "Engineering", "Fine and Applied Arts", "Laws", "Medicine", "Nursing", "Pharmaceutical Sciences", "Political Science", "Psychology", "Science", "Sports Science", "Veterinary Science", "School of Integrated Innovation", "Agricultural Resources", "Graduate School"
];

export default function InfoStep({
    onBack,
    onNext,
}: {
    onBack: () => void
    onNext: () => void
}) {

  useImageUploadHook("profile-picture-input", "profile-picture-div");

  const [up, setUp] = useState(false);
  
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

      <div className="flex flex-1 flex-col justify-center sm:justify-between items-center my-5">
        <label htmlFor="profile-picture-input" className="w-[80px] h-[80px] sm:w-[130px] sm:h-[130px] relative w-full h-full flex items-center justify-center rounded-full cursor-pointer">
          <Input id="profile-picture-input" className="hidden" accept="image/jpeg, image/png" type="file" />
          <div id="profile-picture-div" className="w-[80px] h-[80px] sm:w-[130px] sm:h-[130px] flex items-center justify-center border-1 border-[#ffb7d3] bg-[#fff2f6] rounded-full">
            <Icon icon="bxs:user" className="text-[2.5rem] sm:text-[4rem] text-[#de5c8e] opacity-50" />
          </div>
          <Icon icon="fa7-solid:pen" className="text-[2rem] sm:text-[2.7rem] text-primary absolute bottom-0 right-[-2] p-[8px] sm:p-[12px] bg-white rounded-full shadow-[0.5px_0.5px_4px_0px_rgba(0,0,0,0.25)]" />
        </label>
        <div className="w-full flex flex-col gap-y-2">
          <div className="relative">
            <FormInput label="ชื่อชมรม" className="h-8 sm:h-10 text-text-gray border-stroke text-[12px] sm:text-[14px]" />
          </div>
          <div className="flex flex-col gap-y-2.5">
            <label htmlFor="faculty-dropdown" className="text-black text-base font-bold">
              คณะ
            </label>
            <Dropdown id="faculty-dropdown" content={faculties} itemClassName="cursor-pointer" menuContentClassName="w-[240px] sm:w-[470px]" className="w-full h-8 sm:h-10 rounded-md flex items-center justify-between text-text-gray border-stroke text-[12px] sm:text-[14px] hover:border-primary hover:text-primary hover:bg-white" icon={up? (<ChevronUp />) : (<ChevronDown />)} onOpenChange={(open) => {
              setUp(current => !current);
            }}>
              <span>เลือก</span>
            </Dropdown>
          </div>
          <div className="relative">
            <FormInput label="คำอธิบาย" className="h-10 sm:h-30 text-text-gray border-stroke text-[12px] sm:text-[14px] py-1 sm:py-2" isTextArea={true} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full items-center">
        <Button 
          className="w-full hover:cursor-pointer"
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