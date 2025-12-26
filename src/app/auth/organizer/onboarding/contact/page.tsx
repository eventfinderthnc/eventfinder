"use client"
import { useRouter } from "next/navigation"
import { Button } from '@/components/ui/button'
import React from 'react'
import { ArrowLeft } from "lucide-react"

const Page = () => {

    const router = useRouter()

    return (
        <div className="auth-section">
            <div className="flex flex-col items-center justify-between p-10 w-[320px] h-[510px] sm:w-[550px] sm:h-[660px] shadow-[0_6px_16px_0_rgba(0,0,0,0.25)] rounded-4xl bg-white">
                {/* Header */}
                <div className="w-full flex justify-between items-center">
                    <ArrowLeft 
                        className="text-text-gray hover:text-text-gray-hover transition cursor-pointer" 
                        onClick={() =>
                            router.push("/auth/organizer/onboarding/account")
                        }
                    />
                <h1 className="text-xl sm:text-2xl">ช่องทางติดต่อ</h1>
                <ArrowLeft className="text-white" />
                </div>
                
                <div className="flex flex-col gap-6 w-full">
                    <Button
                        className="w-full text-sm sm:text-base"
                        onClick={() =>
                            router.push("/auth/organizer/onboarding/categories")
                        }
                    >
                        ยืนยัน
                    </Button>

                    <div className="w-full items-center justify-center flex gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d4d4d4]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#949494]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d4d4d4]" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
