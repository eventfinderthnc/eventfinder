import { HydrateClient } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SearchBar } from "@/components/ui/SearchBar";
import { FormInput } from "@/components/ui/FormInput";

export default async function Home() {
	return (
		<HydrateClient>
			<Navbar />
			<main className="flex min-h-screen flex-col p-8 gap-6">
				<Button className="bg-primary w-44">Primary</Button>
				<Button variant="secondary" className="w-44">
					Secondary
				</Button>
				<Button variant="accent" className="w-44">
					Accent
				</Button>
				<div className="flex flex-col justify-top items-center gap-4 mt-20">
					<SearchBar className="w-200"/>
					<FormInput 
						label="ชื่อหัวข้อ"
						className="w-189"
					/>
					<FormInput
						label="รายละเอียด"
						placeholder="เขียนอะไรสักอย่าง..."
						isTextArea= {true}
						className="w-189 h-50"
					/>
					<FormInput 
						icon="link"
						label="ฟอร์มรับสมัคร"
						className="w-189"
					/>
					<div className="flex gap-2.5">
					<FormInput 
						icon="date"
						label="กำหนดเวลา"
						placeholder="วัน/เดือน/ปี"
						isDateTime = {true}
						className="w-93.25"
					/>
					<FormInput 
						icon="time"
						placeholder="เวลา"
						isDateTime = {true}
						className="w-93.25"
					/>
					</div>
				</div>
			</main>
			<Footer />
		</HydrateClient>
	);
}
