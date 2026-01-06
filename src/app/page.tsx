import { HydrateClient } from "@/trpc/server";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea"
import { MultiDropdown } from "@/components/ui/MultiDropdown";
import { Dropdown } from "@/components/ui/Dropdown";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SearchBar } from "@/components/ui/SearchBar";
import { FormInput } from "@/components/ui/FormInput";
import { ChevronDown, SquarePlus } from "lucide-react";

export default async function Home() {
  const content: string[] = [];
  for(let i = 0; i < 5; ++i) {
    content.push("Faculty " + (i + 1));
  }

  const reactNode: React.ReactNode = (
    <svg className="gb_F" focusable="false" viewBox="0 0 24 24"><path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path></svg>
  )

	return (
		<HydrateClient>
			<main className="flex min-h-screen flex-col p-8 gap-6 pb-[1000px]">
				<Navbar />
				<Button className="bg-primary w-44">Primary</Button>
				<Button variant="secondary" className="w-44">
					Secondary
				</Button>
				<Button variant="accent" className="w-44">
					Accent
				</Button>
        
				<Textarea placeholder="เขียนอะไรสักอย่าง..."></Textarea>

				<MultiDropdown className="w-44" content={content} panelLabel="Faculty">
          { reactNode }
        </MultiDropdown>
				<MultiDropdown className="w-44" content={content} panelLabel="Faculty">
           <span>Choose</span>
           <SquarePlus />
        </MultiDropdown>

				<Dropdown className="w-44" content={['a', 'b', 'c', 'asdflkhtiohwiethoihiosdifhisdfiohoishdf', 'e', 'f', 'g', 'h']} panelLabel="Just choose brah">
          { reactNode }
        </Dropdown>
        <div>
          <Dropdown className="max-w-[100px]" content={['a', 'b', 'c', 'asdflkhtiohwiethoihiosdifhisdfiohoishdf', 'e', 'f', 'g', 'h']} panelLabel="Just choose brah p-" icon={<ChevronDown />}>
            Choose
          </Dropdown>
        </div>

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
