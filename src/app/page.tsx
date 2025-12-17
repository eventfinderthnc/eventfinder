import { HydrateClient } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import Calendar from "@/components/ui/calendar";

export default async function Home() {
	return (
		<HydrateClient>
			<main className="flex min-h-screen flex-col p-8 gap-6">
				<Button className="bg-primary w-44">Primary</Button>
				<Button variant="secondary" className="w-44">
					Secondary
				</Button>
				<Button variant="accent" className="w-44">
					Accent
				</Button>

				<Calendar 
					locale="en" // For english
				/>
			</main>
		</HydrateClient>
	);
}
