import { HydrateClient } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { MultiDropdown } from "@/components/ui/multidropdown";
import { Dropdown } from "@/components/ui/dropdown";
import Calendar from "@/components/ui/calendar";

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
				<Button className="bg-primary w-44">Primary</Button>
				<Button variant="secondary" className="w-44">
					Secondary
				</Button>
				<Button variant="accent" className="w-44">
					Accent
				</Button>
        
				<Textarea></Textarea>

				<MultiDropdown className="w-44" content={content} panelLabel="Faculty" reactNode={reactNode} />
				<MultiDropdown className="w-44" content={content} panelLabel="Faculty" buttonName="Choose" />      

				<Dropdown className="w-44" content={['a', 'b', 'c', 'asdflkhtiohwiethoihiosdifhisdfiohoishdf', 'e', 'f', 'g', 'h']} panelLabel="Just choose brah" reactNode={reactNode} />
				<Dropdown className="w-44" content={['a', 'b', 'c', 'asdflkhtiohwiethoihiosdifhisdfiohoishdf', 'e', 'f', 'g', 'h']} panelLabel="Just choose brah" buttonName="Choose" />

			</main>
		</HydrateClient>
	);
}
