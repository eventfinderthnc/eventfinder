"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from "next/navigation"
import { navItemsOrg, navItemsAtten } from '@/components/ui/NavItems'
import { useAuth } from '@/components/ui/context/AuthContext';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
    const pathname = usePathname();
    const { isLoggedIn, isOrg } = useAuth();
    const navItems = (isOrg) ? navItemsOrg : navItemsAtten;
    return(
        <nav className="shadow">
            <div className="h-18.75 px-25 items-center flex justify-between">
                <div className="flex items-center gap-7.5">
                    <Link href={'/'}>
                        <Image
                            src="/images/logo.png" 
                            alt="logo" 
                            width={84}
                            height={42}
                            className="mr-1.5"/>
                    </Link>
                    <div className="text-[#757575] text-base gap-7 flex items-center">
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
                            <Link href="" className="text-[#757575] text-base">ออกจากระบบ</Link>
                            {/* need to replace with actual profile picture */}
                            <Link href="" className="">
                                <Image 
                                src="/images/profile.png"
                                alt="profile"
                                width={40}
                                height={40}/>
                            </Link>
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
    );
}