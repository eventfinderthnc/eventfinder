"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, CalendarPlus, MailPlus, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { getRemainingTime } from "@/app/calendar/page";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import Image from "next/image";
import { themeColor } from "../_components/PostCard";

const PostInfo = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const router = useRouter();

    // fetch data from post database
    const { data: fetchedData, isLoading } = api.post.getOne.useQuery({ id });
    const [tags, setTags] = useState<string[]>([]);
    const [post, setPost] = useState<any>();

    const { data: fetchedTags, isLoading: isLoadingTags } = api.interestXPost.getAllByPostId.useQuery({ postId: id }, {
        enabled: !!id
    });

    useEffect(() => {
        if (!isLoading) {
            const date = fetchedData?.date ?? new Date();
            const adjustedTime = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
            if (fetchedData) {
                fetchedData.date = new Date(adjustedTime);
            }
            setPost(fetchedData);
        }
    }, [isLoading]);

    useEffect(() => {
        if (!isLoadingTags) {
            const tagList: string[] = fetchedTags?.map((tag: any) => tag.name) as string[];
            setTags(tagList);
        }
    }, [isLoadingTags])

    return (
        isLoading ? (
            <div>กำลังโหลด...</div>
        ) : (
            <>
                <Navbar />
                <section className="body-section">
                    <div className="h-full bg-white">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-1.5 text-text-gray hover:text-primary transition-colors duration-150 mb-4 hover:cursor-pointer"
                        >
                            <ArrowLeft className="size-6" />
                            <span className="text-lg font-medium">ย้อนกลับ</span>
                        </button>
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex flex-col gap-8 md:hidden">
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        {/* Organization Image */}
                                        {
                                            post ? (
                                                <Image src={post.userImage} alt={post.name} width={32} height={32} className="h-8 w-8 rounded-full object-cover object-center" />
                                            ) : (
                                                <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                                            )
                                        }
                                        <p className="">{post?.name}</p>
                                    </div>
                                    {/* Todo: Follow Button */}
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h1 className="text-black leading-none">{post?.title}</h1>

                                    <div className="flex flex-col gap-1">
                                        <p>
                                            <span className="font-semibold">ปิดรับสมัคร:</span> {new Intl.DateTimeFormat('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            }).format(post?.date ?? new Date())}
                                        </p>
                                        <p>
                                            <span className="font-semibold">เหลือเวลาอีก:</span> {getRemainingTime(post?.date ?? new Date())}
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        {
                                            tags?.map((tag: string, idx) => (
                                                <div key={idx} className="px-4 py-1.5 rounded-[6px] font-semibold text-xs text-white" style={{ backgroundColor: themeColor[idx % themeColor.length] }}>
                                                    {tag}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h2 className="text-black text-xl font-semibold leading-none">รายละเอียด</h2>
                                    <p className="text-sm w-full">
                                        {
                                            post?.description
                                        }
                                    </p>
                                </div>

                                {/* Contact Section */}
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-black text-xl font-semibold leading-none">ช่องทางการติดต่อ</h2>
                                    <div className="flex flex-col gap-1.5 text-sm">
                                        <p><span className="">Instagram:</span> {post?.socials.instagram ?? "ไม่มี"}</p>
                                        <p><span className="">Facebook:</span> {post?.socials.facebook ?? "ไม่มี"}</p>
                                        <p><span className="">Email:</span> {post?.email ?? "ไม่มี"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 items-center shrink-0">
                                {/* Image */}
                                {/* <div className="w-[420px] h-[500px] bg-gray-400 rounded-[12px]"></div> */}
                                {
                                    post ? (
                                        <Image src={post.image} alt={post.title} width={336} height={400} className="object-cover object-center lg:w-[336px] lg:h-[400px] bg-gray-400 rounded-[12px]" />
                                    ) :
                                        (
                                            <div className="w-[336px] h-[400px] bg-gray-400 rounded-[12px]"></div>
                                        )
                                }
                                <Button className="h-fit w-full text-lg"><a href={post?.instaLink} target="_blank">สมัครเลย</a></Button>
                                {/* <div className="flex flex-1 gap-3">
                                    <div className="w-full flex items-center justify-center p-3 border border-stroke rounded-[12px] cursor-pointer">
                                        <MailPlus className="size-5 text-[#505050]" />
                                    </div>
                                    <div className="w-full flex items-center justify-center p-3 border border-stroke rounded-[12px] cursor-pointer">
                                        <CalendarPlus className="size-5 text-[#505050]" />
                                    </div>
                                    <div className="w-full flex items-center justify-center p-3 border border-stroke rounded-[12px] cursor-pointer">
                                        <Share2 className="size-5 text-[#505050]" />
                                    </div>
                                </div> */}
                            </div>

                            <div className="md:flex flex-col gap-8 hidden">
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        {/* Organization Image */}
                                        {
                                            post ? (
                                                <Image src={post.userImage} alt={post.name} width={32} height={32} className="h-8 w-8 rounded-full object-cover object-center" />
                                            ) : (
                                                <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                                            )
                                        }
                                        <p className="">{post?.name}</p>
                                    </div>
                                    {/* Todo: Follow Button */}
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h1 className="text-black leading-none">{post?.title}</h1>

                                    <div className="flex flex-col gap-1">
                                        <p>
                                            <span className="font-semibold">ปิดรับสมัคร:</span> {new Intl.DateTimeFormat('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            }).format(post?.date ?? new Date())}
                                        </p>
                                        <p>
                                            <span className="font-semibold">เหลือเวลาอีก:</span> {getRemainingTime(post?.date ?? new Date())}
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        {
                                            tags?.map((tag: string, idx) => (
                                                <div key={idx} className="px-4 py-1.5 rounded-[6px] font-semibold text-xs text-white" style={{ backgroundColor: themeColor[idx % themeColor.length] }}>
                                                    {tag}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h2 className="text-black text-xl font-semibold leading-none">รายละเอียด</h2>
                                    <p className="text-sm w-full">
                                        {
                                            post?.description
                                        }
                                    </p>
                                </div>

                                {/* Contact Section */}
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-black text-xl font-semibold leading-none">ช่องทางการติดต่อ</h2>
                                    <div className="flex flex-col gap-1.5 text-sm">
                                        <p><span className=""><b>Instagram:</b></span> {post?.socials.instagram ?? "ไม่มี"}</p>
                                        <p><span className=""><b>Facebook:</b></span> {post?.socials.facebook ?? "ไม่มี"}</p>
                                        <p><span className=""><b>Discord:</b></span> {post?.socials.discord ?? "ไม่มี"}</p>
                                        <p><span className=""><b>Email:</b></span> {post?.email ?? "ไม่มี"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </>)
    );

}

export default PostInfo;