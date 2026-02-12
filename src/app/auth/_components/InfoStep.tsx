"use client";

import { Button } from "@/components/ui/Button"
import { ArrowLeft, ChevronDown, ChevronUp, Check } from "lucide-react"
import { Icon } from "@iconify/react"
import { FormInput } from "@/components/ui/FormInput"
import { Dropdown } from "@/components/ui/Dropdown"
import { Input } from "@/components/ui/Input"
import useImageUploadHook from "@/lib/hooks/useImageUpload";
import { useState } from "react";

const faculties: string[] = [
  "Allied Health Sciences", "Architecture", "Arts", "Commerce and Accountancy", "Communication Arts", "Dentistry", "Economics", "Education", "Engineering", "Fine and Applied Arts", "Laws", "Medicine", "Nursing", "Pharmaceutical Sciences", "Political Science", "Psychology", "Science", "Sports Science", "Veterinary Science", "School of Integrated Innovation", "Agricultural Resources", "Graduate School"
];

interface InfoStepProps {
  onBack: () => void;
  onNext: () => void;
  type?: "attendee" | "organizer";
}

export default function InfoStep({
  onBack,
  onNext,
  type = "organizer",
}: InfoStepProps) {

  useImageUploadHook("profile-picture-input", "profile-picture-div");

  const [up, setUp] = useState(false);

  const title = type === "attendee" ? "กรอกข้อมูลส่วนตัว" : "กรอกข้อมูลชมรม";
  const nameLabel = type === "attendee" ? "ชื่อ" : "ชื่อชมรม";
  const descLabel = type === "attendee" ? "คำอธิบายตัวตน" : "คำอธิบาย";

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center">
        <ArrowLeft
          onClick={onBack}
          className="cursor-pointer text-text-gray hover:text-text-gray-hover"
        />
        <h1 className="text-xl sm:text-2xl">{title}</h1>
        <ArrowLeft className="text-white" />
      </div>

      <div className="flex flex-1 flex-col items-center my-5">
        <label htmlFor="profile-picture-input" className="w-[80px] h-[80px] sm:w-[130px] sm:h-[130px] relative w-full h-full flex items-center justify-center rounded-full cursor-pointer">
          <Input id="profile-picture-input" className="hidden" accept="image/jpeg, image/png" type="file" />
          <div id="profile-picture-div" className="w-[80px] h-[80px] sm:w-[130px] sm:h-[130px] flex items-center justify-center border-1 border-[#ffb7d3] bg-[#fff2f6] rounded-full">
            <Icon icon="bxs:user" className="text-[2.5rem] sm:text-[4rem] text-[#de5c8e] opacity-50" />
          </div>
          <Icon icon="fa7-solid:pen" className="text-[2rem] sm:text-[2.7rem] text-primary absolute bottom-0 right-[-2] p-[8px] sm:p-[12px] bg-white rounded-full shadow-[0.5px_0.5px_4px_0px_rgba(0,0,0,0.25)]" />
        </label>
        <div className="w-full flex flex-col gap-y-2 items-center">
          <div className="w-full relative">
            <FormInput label={nameLabel} className="h-8 sm:h-10 text-text-gray border-stroke text-[12px] sm:text-[14px]" />
          </div>
          <div className="w-full flex flex-col gap-y-2.5">
            <label htmlFor="faculty-dropdown" className="text-black text-base font-bold">
              คณะ
            </label>
            <Dropdown id="faculty-dropdown" content={faculties} itemClassName="cursor-pointer" menuContentClassName="w-[240px] sm:w-[470px]" className="w-full h-8 sm:h-10 rounded-md flex items-center justify-between text-text-gray border-stroke text-[12px] sm:text-[14px] hover:border-primary hover:text-primary hover:bg-white" icon={up ? (<ChevronUp />) : (<ChevronDown />)} onOpenChange={(open) => {
              setUp(current => !current);
            }}>
              <span>เลือก</span>
            </Dropdown>
          </div>
          <div className="w-full relative">
            {type === "attendee" ? (
              <div className="w-full flex items-center space-x-2 mt-4">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="email-notification"
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-stroke bg-white checked:bg-primary checked:border-primary focus:ring-primary focus:outline-none transition-all"
                  />
                  <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <label
                  htmlFor="email-notification"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-text-gray cursor-pointer"
                >
                  รับการแจ้งเตือนกิจกรรมใหม่ผ่านทางอีเมล?
                </label>
              </div>
            ) : (
              <FormInput label={descLabel} className="w-full h-10 sm:h-30 text-text-gray border-stroke text-[12px] sm:text-[14px] py-1 sm:py-2" isTextArea={true} />
            )}
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
          {type === "attendee" ? (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-[#949494]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#d4d4d4]" />
            </>
          ) : (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-[#949494]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#d4d4d4]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#d4d4d4]" />
            </>
          )}
        </div>
      </div>

    </div >
  )
}