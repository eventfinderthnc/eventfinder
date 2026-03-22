"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavItemsOrg, NavItemsAtten } from "@/components/ui/NavItems";
import { useAuth } from "@/components/ui/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export const Navbar = () => {
	const pathname = usePathname();
	const { isLoggedIn, isOrg, user } = useAuth();
	const navItems = isOrg ? NavItemsOrg : NavItemsAtten;
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		setMobileMenuOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (!mobileMenuOpen) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setMobileMenuOpen(false);
		};
		document.addEventListener("keydown", onKeyDown);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.body.style.overflow = "";
		};
	}, [mobileMenuOpen]);

	return (
		<div className="w-full sticky">
			<nav className="shadow sticky top-0 z-50 w-full">
				<div className="py-2.5 sm:py-4 lg:px-25 sm:px-10 px-5 items-center flex justify-between">
					<div className="flex items-center gap-7.5">
						<Image
							src="/images/logo.svg"
							alt="logo"
							width={96}
							height={48}
							className="h-9 sm:h-12 w-auto"
						/>

						<div className="text-[#757575] text-base gap-7 hidden lg:flex items-center">
							{navItems.map((item) => (
								<Link key={item.href} href={item.href} data-active={pathname === item.href}>
									{item.label}
								</Link>
							))}
						</div>
					</div>
					<div>
						{isLoggedIn ? (
							<div className="flex items-center gap-6">
								<button
									type="button"
									onClick={() => signOut()}
									className="text-[#757575] hidden lg:flex text-base hover:underline cursor-pointer"
								>
									ออกจากระบบ
								</button>
								<Link
									href="/"
									className="relative block h-7 w-7 sm:h-10 sm:w-10 overflow-hidden rounded-full bg-[#fff2f6] border border-[#ffb7d3]"
								>
									{user?.image?.startsWith("http") ? (
										<Image
											src={user.image}
											alt={user.name ?? "Profile"}
											width={40}
											height={40}
											className="h-full w-full object-cover"
										/>
									) : (
										<Image
											src="/images/Profile.svg"
											alt="profile"
											width={40}
											height={40}
											className="h-7 sm:h-10 w-auto"
										/>
									)}
								</Link>
								<button
									type="button"
									className="lg:hidden flex flex-col sm:gap-[7px] gap-[4.9px] justify-evenly items-center"
									aria-label={mobileMenuOpen ? "ปิดเมนู" : "เปิดเมนู"}
									aria-expanded={mobileMenuOpen}
									aria-controls="mobile-nav-drawer"
									onClick={() => setMobileMenuOpen((open) => !open)}
								>
									<div className="sm:w-9 w-[24.5px] bg-[#757575] sm:h-1 h-[2.8px] rounded-md" />
									<div className="sm:w-9 w-[24.5px] bg-[#757575] sm:h-1 h-[2.8px] rounded-md" />
									<div className="sm:w-9 w-[24.5px] bg-[#757575] sm:h-1 h-[2.8px] rounded-md" />
								</button>
							</div>
						) : (
							<div className="flex items-center gap-6">
							<Link href="/auth" className="text-[#757575] text-base">
								เข้าสู่ระบบ
							</Link>
							<Link href="/auth/attendee/register">
								<Button className="bg-[#DE5C8E] text-white px-6 py-2.5 rounded-full text-base">
									ลงทะเบียน
								</Button>
							</Link>
							</div>
						)}
					</div>
				</div>
			</nav>

			{isLoggedIn && (
				<>
					<div
						className={cn(
							"fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden",
							mobileMenuOpen
								? "pointer-events-auto opacity-100"
								: "pointer-events-none opacity-0",
						)}
						aria-hidden
						onClick={() => setMobileMenuOpen(false)}
					/>
					<div
						id="mobile-nav-drawer"
						role="dialog"
						aria-modal="true"
						aria-label="เมนูนำทาง"
						className={cn(
							"fixed top-0 right-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-xl transition-transform duration-300 ease-out lg:hidden",
							mobileMenuOpen
								? "translate-x-0 pointer-events-auto"
								: "translate-x-full pointer-events-none",
						)}
					>
						<div className="flex items-center justify-between border-b border-[#eee] px-5 py-4">
							<span className="text-lg font-medium text-[#424242]">เมนู</span>
							<button
								type="button"
								className="rounded-md p-2 text-[#757575] hover:bg-[#f5f5f5]"
								aria-label="ปิดเมนู"
								onClick={() => setMobileMenuOpen(false)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
									aria-hidden
								>
									<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
						<nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-6">
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									data-active={pathname === item.href}
									className="rounded-lg px-3 py-3 text-base text-[#757575] hover:bg-[#fff2f6] data-[active=true]:font-medium data-[active=true]:text-[#DE5C8E]"
									onClick={() => setMobileMenuOpen(false)}
								>
									{item.label}
								</Link>
							))}
							<button
								type="button"
								className="mt-auto rounded-lg px-3 py-3 text-left text-base text-[#757575] hover:bg-[#fff2f6] hover:underline"
								onClick={() => {
									setMobileMenuOpen(false);
									void signOut();
								}}
							>
								ออกจากระบบ
							</button>
						</nav>
					</div>
				</>
			)}
		</div>
	);
};
