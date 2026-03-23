"use client"

import { api } from "@/trpc/react"
import { useMemo, useState } from "react"
import { useWatch } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { fileToBase64 } from "@/lib/hooks/useImageUpload"
 
import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/ui/Footer"
import { FormInput } from "@/components/ui/FormInput"
import { Button } from "@/components/ui/Button"
import { Upload } from "lucide-react"
import { FileInput } from "@/components/ui/FileInput"

/** Same as create-post API body except org + final image URL (filled on submit / after upload). */
const CreatePostWithInterestsSchema = z.object({
    title: z.string().min(1),
    activityTypeId: z.string().uuid(),
    description: z.string().min(1),
    instaLink: z.string().optional(),
    image: z.string(),
    date: z.date(),
    interestIds: z.array(z.string().uuid()).min(1),
})

type CreatePostWithInterests = z.infer<typeof CreatePostWithInterestsSchema>

const CreatePage = () => {
    const { data: activityTypes } = api.activityType.getAll.useQuery();
    const { data: interests } = api.interest.getAll.useQuery();

    const router = useRouter()
    const { data: session } = useSession()

    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    
    const { handleSubmit, getValues, setValue, control, watch, formState: { errors } } = useForm<CreatePostWithInterests>({
        resolver: zodResolver(CreatePostWithInterestsSchema),
        defaultValues: {
            title: "",
            activityTypeId: "",
            interestIds: [],
            description: "",
            instaLink: "",
            image: "",
            date: new Date(),
        }
    })

    const watchedActivityTypeId = useWatch({ control, name: "activityTypeId" })
    const watchedInterestIds = useWatch({ control, name: "interestIds" }) as string[] | undefined

    const activityTypeDropdownLabel = useMemo(
        () => activityTypes?.find((t) => t.id === watchedActivityTypeId)?.name,
        [activityTypes, watchedActivityTypeId],
    )

    const interestMultiLabels = useMemo(
        () =>
            watchedInterestIds?.length
                ? (watchedInterestIds
                    .map((id: string) => interests?.find((i) => i.id === id)?.name)
                    .filter((n: string | undefined): n is string => Boolean(n)) ?? [])
                : [],
        [interests, watchedInterestIds],
    )

    const createPost = api.post.create.useMutation({
        onSuccess: (res) => {
            console.log("post created: ", res)
            router.push("/")
        },
        onError: (error) => {
            console.error("Failed to create post:", error)
        },
    })

    const uploadMutation = api.upload.uploadImage.useMutation()

    const handleFileSelect = (file: File | null, previewUrl: string) => {
        if (imagePreview) URL.revokeObjectURL(imagePreview)
        if (file && previewUrl) {
            // console.log("Test: ", file)
            setImagePreview(previewUrl)
            setImageFile(file)
            setValue("image", previewUrl)
        } else {
            setImagePreview(null)
            setImageFile(null)
            setValue("image", "")
        }
    }

    const formValues = watch()
    const canSubmit = useMemo(() => {
        const uuidOk = z.string().uuid().safeParse(formValues.activityTypeId).success
        const descOk = (formValues.description ?? "").trim().length > 0
        return (
            Boolean(session?.user?.id) &&
            formValues.title.trim().length > 0 &&
            uuidOk &&
            descOk &&
            formValues.interestIds.length >= 1 &&
            imageFile !== null &&
            !createPost.isPending &&
            !uploadMutation.isPending
        )
    }, [session?.user?.id, formValues, imageFile, createPost.isPending, uploadMutation.isPending])
    
    const onSubmit = async (data: CreatePostWithInterests) => {
        if (!session?.user?.id) {
            console.error("No user session found");
            return;
        }
        if (!imageFile) {
            console.error("No image selected")
            return;
        }

        const base64 = await fileToBase64(imageFile)
        const uploadRes = await uploadMutation.mutateAsync({
            data: base64,
            contentType: imageFile.type as "image/jpeg" | "image/png" | "image/webp",
        })
        createPost.mutate({
            title: data.title,
            activityTypeId: data.activityTypeId,
            description: data.description,
            instaLink: data.instaLink,
            image: uploadRes.url,
            date: data.date,
            interestIds: data.interestIds,
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
                            value={watch("title")}
                            onTextChange={(value) => setValue("title", value)}
                        />
                        <div className="flex lg:flex-row flex-col lg:gap-4 gap-5 justify-between">
                            <div className="basis-1/3 gap-2.5">
                                <FormInput 
                                    label="รูปแบบกิจกรรม"
                                    icon="type"
                                    isDropdown={true}
                                    typeList={activityTypes?.map((t) => t.name) ?? []}
                                    dropdownValue={activityTypeDropdownLabel}
                                    className="w-full focus-visible:ring-0"
                                    onDropdownChange={(value) => {
                                        const match = activityTypes?.find((t) => t.name === value)
                                        if (match) setValue("activityTypeId", match.id)
                                    }}
                                />
                            </div>
                            <div className="basis-2/3 gap-2.5">
                                <FormInput 
                                    label="หมวดหมู่"
                                    icon="category"
                                    isMultiDropdown={true}
                                    categoryList={interests?.map((t) => t.name) ?? []}
                                    multiValue={interestMultiLabels}
                                    className="w-full"
                                    onMultiDropdownChange={(values) => {
                                        const matches = values
                                            .map((name) => interests?.find((i) => i.name === name)?.id)
                                            .filter((id): id is string => id !== undefined)
                                        setValue("interestIds", matches)
                                    }}
                                />
                            </div>
                        </div>
                        <FormInput
                            label="รายละเอียด"
                            placeholder="เขียนอะไรสักอย่าง..."
                            isTextArea= {true}
                            className="w-full h-25 sm:h-75 sm:resize-none selection:bg-primary selection:text-primary-foreground placeholder:text-sm sm:placeholder:text-base"
                            value={watch("description") ?? ""}
                            onTextChange={(value) => setValue("description", value)}
                        />
                        <FormInput
                            icon="link"
                            label="ฟอร์มรับสมัคร"
                            className="w-full"
                            value={watch("instaLink") ?? ""}
                            onTextChange={(value) => setValue("instaLink", value)}
                        />
                        <div className="flex sm:flex-row flex-col items-stretch gap-2.5 w-full">
                            <div className="grow w-full">
                                <FormInput 
                                    icon="date"
                                    label="กำหนดเวลา"
                                    placeholder="วัน/เดือน/ปี"
                                    isDate={true}
                                    className=""
                                    dateValue={watch("date")}
                                    onDateChange={(value) => setValue("date",value)}
                                />
                            </div>
                            <div className="grow w-full">
                                <FormInput 
                                    icon="time"
                                    placeholder="เวลา"
                                    isTime={true}
                                    className=""
                                    dateValue={watch("date")}
                                    onTimeChange={(time) => {
                                        const current = new Date(getValues("date"))
                                        current.setHours(time.getHours())
                                        current.setMinutes(time.getMinutes())
                                        setValue("date",current)
                                    }}
                                />
                            </div>
                        </div>
                        <Button
                            onClick={() => {
                                handleSubmit(onSubmit)()
                                // console.log("current form values:", getValues())
                                // console.log("form errors:", errors)
                            }}
                            disabled={!canSubmit}
                            className="w-full text-white h-12 text-base hover:bg-primary/90"
                        >
                            {createPost.isPending ? "กำลังสร้างโพสต์..." : "อัพโหลด"}
                        </Button>
                    </section>
                    {/* Right: upload picture */}
                    <aside className="sm:basis-2/5 w-full relative">
                        {imagePreview ? (
                            <div className="w-full">
                                <img
                                    src={imagePreview}
                                    alt="Image preview"
                                    className="w-full h-auto rounded-md object-contain"
                                />
                                <div className="mt-5 flex justify-center">
                                    <FileInput
                                        placeholder="เปลี่ยนรูปภาพ"
                                        onFileSelect={handleFileSelect}
                                        className="justify-center text-base bg-[#DE5C8E] text-white lg:h-10 lg:w-60"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="bg-[#DE5C8E0D] rounded-md w-full sm:h-155 h-100 flex flex-col items-center justify-center gap-2.5 border-dashed border-[#DE5C8E] border-2">
                                <div className="flex flex-col items-center justify-center gap-2.5">
                                    <Upload color="#DE5C8E" className="w-8 h-auto sm:w-12"/>
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