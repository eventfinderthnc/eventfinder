"use client"

import { SearchBar } from '@/components/ui/SearchBar'
import React, { useState } from 'react'
import type { ClubCardProps } from './ClubCard'
import ClubCard from './ClubCard'
import { SlidersHorizontal } from 'lucide-react'

const data: ClubCardProps[] = [
    {
        name: "Thinc.",
        description: "Thinc. is a student-run community aiming to make impact to society.",
        tag: "thinc.in.th",
        imageUrl: "/images/profile.png",
        categories: [
            {
                name: "Tech",
                color: "#4369C1",
            },
            {
                name: "UX/UI",
                color: "#C16DDD",
            },
            {
                name: "Marketing",
                color: "#E7935F",
            },
        ]
    },
    {
        name: "Thinc.",
        description: "Thinc. is a student-run community aiming to make impact to society.",
        tag: "thinc.in.th",
        imageUrl: "/images/profile.png",
        categories: [
            {
                name: "Tech",
                color: "#4369C1",
            },
            {
                name: "UX/UI",
                color: "#C16DDD",
            },
            {
                name: "Marketing",
                color: "#E7935F",
            },
        ]
    },
    {
        name: "Thinc.",
        description: "Thinc. is a student-run community aiming to make impact to society.",
        tag: "thinc.in.th",
        imageUrl: "/images/profile.png",
        categories: [
            {
                name: "Tech",
                color: "#4369C1",
            },
            {
                name: "UX/UI",
                color: "#C16DDD",
            },
            {
                name: "Marketing",
                color: "#E7935F",
            },
        ]
    },
    {
        name: "Thinc.",
        description: "Thinc. is a student-run community aiming to make impact to society.",
        tag: "thinc.in.th",
        imageUrl: "/images/profile.png",
        categories: [
            {
                name: "Tech",
                color: "#4369C1",
            },
            {
                name: "UX/UI",
                color: "#C16DDD",
            },
            {
                name: "Marketing",
                color: "#E7935F",
            },
        ]
    },
]
const ClubsPage = () => {

    const [openFilter, setOpenFilter] = useState(false);

    return (
        <section className='body-section'>
            <h1>สำรวจชมรม</h1>
            <div className='flex flex-col gap-4 sm:gap-6 w-full'>
                {/* Top Section */}
                <div className='flex gap-2 sm:gap-4 w-full'>
                    <SearchBar className='w-full' />   
                    {/* Filter Icon */}
                    <div 
                        className='w-12 h-12 flex justify-center items-center border border-stroke rounded-[10px] text-text-gray  hover:text-primary hover:border-2 hover:border-primary transition-all'
                        onClick={() => setOpenFilter(!openFilter)}
                    >
                        <SlidersHorizontal />
                    </div>
                </div>

                {/* Filter Menu */}
                {openFilter && (
                    <div className='w-full border border-stroke rounded-[10px] p-4'>
                        
                    </div>
                )}
                
                {/* Clubs Section */}
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6'>
                    {data.map((club, idx) => (
                        <ClubCard key={idx} {...club} />
                    ))}
                </div>

            </div>
        </section>
    )
}

export default ClubsPage
