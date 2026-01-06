import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/ui/Footer"
import { FormInput } from "@/components/ui/FormInput"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Upload } from "lucide-react"
import { FileInput } from "@/components/ui/FileInput"

const CreatePage = () => {
    const type: string[] = ["ONSITE","ONLINE","HYBRID"];
    const category: string[] = ["Coding", "Business", "Hackathon", "Healthcare", "Self-development"];
    return (
        <div>
            <Navbar />
            <main className="px-25 pt-5 pb-20 min-h-screen">
                <h1 className="text-[#DE5C8E] text-[28px] pb-5">สร้างโพสต์</h1>
                {/* Left: form input */}
                <div className="flex items-start gap-7">
                    <section className="basis-3/5 min-h-screen flex flex-col gap-5">
                        <FormInput 
                            label="ชื่อหัวข้อ"
                            className="min-w-full"
                        />
                        <div className="flex gap-4">
                            <div className="basis-1/3 gap-2.5">
                                <FormInput 
                                    label="รูปแบบกิจกรรม"
                                    icon="type"
                                    isDropdown= {true}
                                    typeList= {type}
                                    className="min-w-full focus-visible:ring-0"
                                />
                            </div>
                            <div className="basis-2/3 gap-2.5">
                                <FormInput 
                                    label="หมวดหมู่"
                                    icon="category"
                                    isMultiDropdown= {true}
                                    categoryList= {category}
                                    className="min-w-full"
                                />
                            </div>
                        </div>
                        <FormInput
                            label="รายละเอียด"
                            placeholder="เขียนอะไรสักอย่าง..."
                            isTextArea= {true}
                            className="min-w-full h-50 resize-none"
                        />
                        <FormInput 
                            icon="link"
                            label="ฟอร์มรับสมัคร"
                            className="w-full"
                        />
                        <div className="flex items-stretch gap-2.5 min-w-full">
                            <div className="grow w-full">
                                <FormInput 
                                    icon="date"
                                    label="กำหนดเวลา"
                                    placeholder="วัน/เดือน/ปี"
                                    isDate = {true}
                                    className=""
                                />
                            </div>
                            <div className="grow w-full">
                                <FormInput 
                                    icon="time"
                                    placeholder="เวลา"
                                    isTime = {true}
                                    className=""
                                />
                            </div>
                        </div>
                        <Button className="min-w-full text-white h-12 text-base">อัพโหลด</Button>
                    </section>
                    {/* Right: upload picture */}
                    <aside className="basis-2/5">
                        <div className="bg-[#DE5C8E0D] rounded-md min-w-full h-150 flex flex-col items-center justify-center gap-2.5 border-dashed border-[#DE5C8E] border-2">
                            <div className="flex flex-col items-center justify-center gap-2.5">
                                <Upload 
                                    width={48}
                                    height={48}
                                    color="#DE5C8E"
                                    className=""/>
                                <h1 className="text-base">ลากแล้วปล่อยรูปภาพที่นี่</h1>
                            </div>
                            <FileInput
                                placeholder="เลือกจากในคอมพิวเตอร์"
                                className="w-60 justify-center text-base bg-[#DE5C8E] text-white"
                            />
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default CreatePage