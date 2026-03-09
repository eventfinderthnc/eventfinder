"use client"

import { api } from "@/trpc/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"

import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/ui/Footer"
import { FormInput } from "@/components/ui/FormInput"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Upload } from "lucide-react"
import { FileInput } from "@/components/ui/FileInput"

const CreatePage = () => {
    const router = useRouter()
    const { data: session } = useSession()

    const [title, setTitle] = useState("")
    const [organizationId, setOrganizationId] = useState("")
    const [activityTypeId, setActivityTypeId] = useState("")
    const [description, setDescription] = useState("")
    const [instaLink, setInstaLink] = useState("")
    const [date, setDate] = useState<Date>(new Date())
    const [time, setTime] = useState<Date | null>(null)
    const [imageUrl, setImageUrl] = useState<String | null>(null)

    const type: string[] = ["ONSITE","ONLINE","HYBRID"];
    const category: string[] = ["Coding", "Business", "Hackathon", "Healthcare", "Self-development"];
    const createPost = api.post.create.useMutation({
        onSuccess: () => {
            router.push("/")
        },
        onError: (error) => {
            console.error("Failed to create post:", error)
        },
    })
    const getMergedDate = (): Date | null => {
        if(!date) return null
        const merged = new Date(date)
        if(time){
            merged.setHours(time.getHours())
            merged.setMinutes(time.getMinutes())
        }
        return merged
    }

    const handleSubmit = () => {
        if (!session?.user?.id) {
            console.error("No user session found");
            return;
        }
        if (!imagePreview) {
            console.error("No image selected")
            return;
        }
        const mergedDate = getMergedDate()
        if(!mergedDate){
            console.error("No date selected")
            return;
        }
        createPost.mutate({
            title,
            organizationId: session.user.id,
            activityTypeId,
            description,
            instaLink,
            image: imagePreview,
            date,
        })
    }   
    return (
        <div>
            <Navbar />
            <main className="lg:px-25 sm:px-10 px-5 pt-5 pb-5 sm:pb-20 h-full">
                <h1 className="text-[#DE5C8E] text-[24px] sm:text-[28px] pb-4 sm:pb-6 lg:pb-5">สร้างโพสต์</h1>
                {/* Left: form input */}
                <div className="flex sm:flex-row flex-col-reverse items-start gap-4 sm:gap-7">
                    <section className="sm:basis-3/5 sm:h-full w-full flex flex-col gap-4 sm:gap-5">
                        <FormInput 
                            label="ชื่อหัวข้อ"
                            className="w-full"
                            onTextChange={(value) => setTitle(value)}
                        />
                        <div className="flex lg:flex-row flex-col lg:gap-4 gap-5 justify-between">
                            <div className="basis-1/3 gap-2.5">
                                <FormInput 
                                    label="รูปแบบกิจกรรม"
                                    icon="type"
                                    isDropdown={true}
                                    typeList={type}
                                    className="w-full focus-visible:ring-0"
                                    onDropdownChange={(value) => setActivityTypeId(value)}
                                />
                            </div>
                            <div className="basis-2/3 gap-2.5">
                                <FormInput 
                                    label="หมวดหมู่"
                                    icon="category"
                                    isMultiDropdown={true}
                                    categoryList={category}
                                    className="w-full"
                                    onMultiDropdownChange={(values) => console.log(values)}
                                />
                            </div>
                        </div>
                        <FormInput
                            label="รายละเอียด"
                            placeholder="เขียนอะไรสักอย่าง..."
                            isTextArea= {true}
                            className="w-full h-25 sm:h-75 sm:resize-none selection:bg-primary selection:text-primary-foreground placeholder:text-sm sm:placeholder:text-base"
                            onTextChange={(value) => setDescription(value)}
                        />
                        <FormInput
                            icon="link"
                            label="ฟอร์มรับสมัคร"
                            className="w-full"
                            onTextChange={(value) => setInstaLink(value)}
                        />
                        <div className="flex sm:flex-row flex-col items-stretch gap-2.5 w-full">
                            <div className="grow w-full">
                                <FormInput 
                                    icon="date"
                                    label="กำหนดเวลา"
                                    placeholder="วัน/เดือน/ปี"
                                    isDate={true}
                                    className=""
                                    onDateChange={(date) => setDate(date)}
                                />
                            </div>
                            <div className="grow w-full">
                                <FormInput 
                                    icon="time"
                                    placeholder="เวลา"
                                    isTime={true}
                                    className=""
                                    onTimeChange={(time) => setTime(time)}
                                />
                            </div>
                        </div>
                        <Button className="w-full text-white h-12 text-base hover:bg-accent/30">อัพโหลด</Button>
                    </section>
                    {/* Right: upload picture */}
                    <aside className="sm:basis-2/5 w-full relative">
                        {imageUrl ? (
                            <div className="w-full">
                            <img 
                                src={imageUrl}
                                alt="Image preview"
                                className="w-full h-auto rounded-md object-contain"
                            />
                            <div className="mt-5 flex justify-center">
                                <FileInput
                                    placeholder="เปลี่ยนรูปภาพ"
                                    onFileSelect={handleFileSelect}
                                    className="justify-center text-base bg-[#DE5C8E] text-white lg:h-10 rounded-full"
                                />
                            </div>
                            </div>
                        ) : (
                            <div className="bg-[#DE5C8E0D] rounded-md w-full sm:h-155 h-100 flex flex-col items-center justify-center gap-2.5 border-dashed border-[#DE5C8E] border-2">
                            <div className="flex flex-col items-center justify-center gap-2.5">
                                <Upload 
                                color="#DE5C8E"
                                className="w-8 h-auto sm:w-12"
                                />
                                <h1 className="font-medium text-base hidden lg:flex">ลากแล้วปล่อยรูปภาพที่นี่</h1>
                                <h1 className="font-medium sm:text-base text-sm flex lg:hidden">อัพโหลดรูปภาพ</h1>
                            </div>
                            <FileInput
                                placeholder="เลือกจากในคอมพิวเตอร์"
                                onFileSelect={handleFileSelect}
                                className="justify-center text-base bg-[#DE5C8E] text-white absolute inset-0 w-full h-full opacity-0 cursor-pointer lg:static lg:w-60 lg:h-10 lg:opacity-100"
                            />
                            </div>
                        )}
                    </aside>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default CreatePage