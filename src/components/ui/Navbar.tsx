"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from "next/navigation"
import { NavItemsOrg, NavItemsAtten } from '@/components/ui/NavItems'
import { useAuth } from '@/components/ui/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Menu } from "lucide-react"

export const Navbar = () => {
    const pathname = usePathname();
    const { isLoggedIn, isOrg } = useAuth();
    const navItems = (isOrg) ? NavItemsOrg : NavItemsAtten;
    return(
        <div className="relative w-full">
            <nav className="shadow w-full absolute top-0 left-1/2 -translate-x-1/2">
                <div className="py-2.5 sm:py-4 lg:px-25 sm:px-10 px-5 items-center flex justify-between">
                    <div className="flex items-center gap-7.5">
                        <Link href="/">
                            <Image
                                src="/images/logo.svg"
                                alt="logo"
                                width={96}
                                height={48}
                                className="h-9 sm:h-12 w-auto"
                            />
                        </Link>
                        <div className="text-[#757575] text-base gap-7 hidden lg:flex items-center">
                            {navItems.map(item => (
                                <Link 
                                    key={item.href} 
                                    href={item.href}
                                    data-active={pathname === item.href}>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        {(isLoggedIn) ? 
                            (<div className="flex items-center gap-6">
                                <Link href="" className="text-[#757575] hidden lg:flex text-base">ออกจากระบบ</Link>
                                {/* need to replace with actual profile picture */}
                                <Link href="" className="">
                                    <Image 
                                    src="/images/Profile.svg"
                                    alt="profile"
                                    width={40}
                                    height={40}
                                    className="h-7 sm:h-10 w-auto"/>
                                </Link>
                                <button className="lg:hidden flex flex-col sm:gap-[7px] gap-[4.9px] justify-evenly items-center">
                                    <div className="sm:w-9 w-[24.5px] bg-[#757575] sm:h-1 h-[2.8px] rounded-md"></div>
                                    <div className="sm:w-9 w-[24.5px] bg-[#757575] sm:h-1 h-[2.8px] rounded-md"></div>
                                    <div className="sm:w-9 w-[24.5px] bg-[#757575] sm:h-1 h-[2.8px] rounded-md"></div>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-6">
                                <Link href="" className="text-[#757575] text-base">เข้าสู่ระบบ</Link>
                                <Link href=""><Button className="bg-[#DE5C8E] text-white px-6 py-2.5 rounded-full text-base">ลงทะเบียน</Button></Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            
            <div className="h-18.75"></div>
        </div>
    );
}