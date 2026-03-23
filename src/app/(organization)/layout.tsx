import { requireRole } from "@/lib/require-role";

export default async function OrganizationGroupLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	await requireRole("ORGANIZATION");
	return children;
}
