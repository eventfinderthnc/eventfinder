import type { Post } from "@/server/api/dto/post.dto";
import { Button } from "../ui/Button";
import { CalendarPlus, MailPlus, Share2 } from "lucide-react";

type PostInfoProps = {
	post: Post;
}

const PostInfo: React.FC<PostInfoProps> = ({ post }) => {
	return (
		<div className="w-4/5 h-full bg-white rounded-[16px] p-6 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]">
			<div className="flex gap-8">
				<div className="flex flex-col gap-3">
					{/* Image */}
					<div className="w-[420px] h-[500px] bg-gray-400 rounded-[12px]"></div>
					<Button className="h-fit text-lg">สมัครเลย</Button>
					<div className="flex flex-1 gap-3">
						<div className="w-full flex items-center justify-center p-3 border border-stroke rounded-[12px] cursor-pointer">
							<MailPlus className="size-5 text-[#505050]" />
						</div>
						<div className="w-full flex items-center justify-center p-3 border border-stroke rounded-[12px] cursor-pointer">
							<CalendarPlus className="size-5 text-[#505050]" />
						</div>
						<div className="w-full flex items-center justify-center p-3 border border-stroke rounded-[12px] cursor-pointer">
							<Share2 className="size-5 text-[#505050]" />
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-8">
					<div className="w-full flex justify-between items-center">
						<div className="flex gap-3 items-center">
							{/* Organization Image */}
							<div className="w-8 h-8 bg-gray-400 rounded-full"></div>
							<p className="">Name</p>
						</div>
						{/* Todo: Follow Button */}
					</div>

					<div className="flex flex-col gap-3">
						<h1 className="text-black leading-none">Post Title</h1>

						<div className="flex gap-5">
							<p>
								<span className="font-semibold">ปิดรับสมัคร:</span> 12/10/2025
							</p>
							<p>
								<span className="font-semibold">เหลือเวลาอีก:</span> 6 วัน 7 ชม.
							</p>
						</div>

						<div className="flex gap-3">
							<div className="px-4 py-1.5 rounded-[6px] font-semibold text-xs bg-[#4369c1] text-white">
								Tech
							</div>
							<div className="px-4 py-1.5 rounded-[6px] font-semibold text-xs bg-[#c16ddd] text-white">
								UX/UI
							</div>
							<div className="px-4 py-1.5 rounded-[6px] font-semibold text-xs bg-[#e7935f] text-white">
								Marketing
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-3">
						<h2 className="text-black text-xl font-semibold leading-none">รายละเอียด</h2>
						<p className="text-sm w-full">
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.Lorem
							ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua. Ut enim ad
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.Lorem
							ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua. Ut enim ad
							<br />
							<br />
							minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex e.Lorem ipsum
							dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua.
						</p>
					</div>

					{/* Contact Section */}
					<div className="flex flex-col gap-3">
						<h2 className="text-black text-xl font-semibold leading-none">ช่องทางการติดต่อ</h2>
						<div className="flex flex-col gap-1.5 text-sm">
                            <p><span className="">Instagram:</span> @example</p>
                            <p><span className="">Facebook:</span> @example</p>
                            <p><span className="">Email:</span> example@example.com</p>
                        </div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PostInfo;