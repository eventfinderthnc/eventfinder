"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Linkedin, Instagram, Globe } from 'lucide-react';
import { navItemsOrg, navItemsAtten } from '@/components/ui/navItems';
import { useAuth } from '@/components/ui/context/AuthContext';

export const Footer = () => {
    const { isLoggedIn, isOrg } = useAuth();
    const navItems = (isOrg) ? navItemsOrg : navItemsAtten;
    return (
        <footer className="shadow-[0_-1px_6px_0_rgba(0,0,0,0.12)] flex flex-col gap-y-5 px-25 pt-7.5 pb-5">
            <div className="flex relative items-center mb-5">
                <div className="flex flex-col gap-y-3">
                    <Image
                        src="/images/logo[cropped].png" 
                        alt="logo" 
                        width={128}
                        height={64}
                        className=""/>
                    <div className="items-center flex gap-2">
                        <Image src ="/images/github-logo.png" alt="github" width={34} height={34}/>
                        <Link href="" target="_blank" className="text-black text-sm">available open source</Link>
                    </div>
                </div>
                <div className="text-[#757575] text-base gap-7.5 flex items-center absolute left-1/2 -translate-x-1/2">
                    {navItems.map(item => (
                        <Link key={item.href} href={item.href}>
                            {item.label}
                        </Link>
                    ))}
                </div>
                <div className="ml-auto items-center gap-2.5 flex">
                    <Link href="" target="_blank"><Facebook size={28} color="black"/></Link>
                    <Link href="" target="_blank"><Linkedin size={28} color="black"/></Link>
                    <Link href="" target="_blank"><Instagram size={28} color="black"/></Link>
                    <Link href="" target="_blank"><Globe size={28} color="black"/></Link>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-[#8C8C8C] text-sm">2025 all right reserved</div>
                <div className="text-[#8C8C8C] text-sm gap-8 flex underline">
                    <Link href="" target="_blank">Privacy Policy</Link>
                    <Link href="" target="_blank">Privacy Reference</Link>
                </div>
            </div>
        </footer>
    );
}