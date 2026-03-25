import { requireRole } from "@/lib/require-role";

export default async function SharedGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
