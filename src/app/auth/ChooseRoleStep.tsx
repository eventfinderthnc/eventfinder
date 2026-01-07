import { Button } from "@/components/ui/Button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image";
import Link from "next/link"

export default function ChooseRoleStep({
    onBack,
    onNext,
}: {
    onBack : () => void
    onNext : () => void
}){
    return (
    <div className="flex flex-col h-full justify-between pb-12">
      <div className="flex justify-between items-center">
        <ArrowLeft
          onClick={onBack}
          className="cursor-pointer text-text-gray hover:text-text-gray-hover"
        />
        <h1 className="text-xl sm:text-2xl">คำถามก่อนเข้าสู่ระบบ</h1>
        <ArrowLeft className="text-white" />
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-5">
        <Link href="auth/attendee/login" className="flex">
            <button className="border-black shadow-[0_0_10px_0_rgba(0,0,0,0.2)] w-50 h-56 rounded-4xl flex flex-col justify-center items-center gap-8">
                <Image src="/images/undraw_knowledge_0ty5 1.svg" alt="org" width={85} height={90}/>
                <span className="text-black text-[18px] font-medium">ผู้เข้าร่วมกิจกรรม</span>
            </button>
        </Link>
        <Link href="auth/organizer/login" className="flex">
            <button className="border-black shadow-[0_0_10px_0_rgba(0,0,0,0.2)] w-50 h-56 rounded-4xl flex flex-col justify-center items-center gap-8">
                <Image src="/images/undraw_projections_fhch 1.svg" alt="atten" width={85} height={90}/>
                <span className="text-black text-[18px] font-medium">ผู้จัดกิจกรรม</span>
            </button>
        </Link>
      </div>
      <Button className="h-10.5 text-base">
        ลงทะเบียน
      </Button>
    </div>
  )
};