import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input";
import { ArrowLeft } from "lucide-react"
import Image from "next/image";
import Link from "next/link"

export default function OrganizerLoginStep({
    onBack,
    onNext,
}: {
    onBack: () => void
    onNext: () => void
}){
    return (
    <div className="flex flex-col h-full justify-evenly gap-6">
      <div className="flex justify-between items-center">
        <ArrowLeft
          onClick={onBack}
          className="cursor-pointer text-text-gray hover:text-text-gray-hover"
        />
        <ArrowLeft className="text-white" />
      </div>
      <div className="flex flex-col justify-between items-center gap-6 w-full">
        <Image src="/images/undraw_projections_fhch 1.svg" alt="atten" width={170} height={170}/>
        <div className="flex flex-col justify-between items-center gap-6 w-full">
          <h1 className="text-[26px] font-semibold">ผู้จัดกิจกรรม</h1>
          <div className="flex flex-col gap-2.5 items-center justify-between w-full">
            <Input 
            placeholder="ชื่อผู้ใช้" 
            className="w-full"/>
            <Input 
            type="password"
            placeholder="รหัสผ่าน" 
            className="w-full focus:border-primary"/>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Button onClick={onNext} className="h-10.5 text-base">
          ลงทะเบียน
        </Button>
        <div className="flex justify-between flex-row">
          <div className="flex flex-col items-start">
            <Link href="">
              <span className="font-regular text-sm text-text-gray underline">
                ลืมรหัสผ่าน
              </span>
            </Link>
            <Link href="">
              <span className="font-regular text-sm text-text-gray underline">
                มีบัญชีอยู่แล้ว
              </span>
            </Link>
          </div>
          <Link href="">
            <span className="font-regular text-sm text-text-gray underline">
              ลงชื่อในฐานะผู้เข้าร่วมกิจกรรม
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
};