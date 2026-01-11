import { SearchBar } from '@/components/ui/SearchBar'
import React from 'react'
import type { ClubCardProps } from './ClubCard'
import ClubCard from './ClubCard'

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

    return (
        <section className='body-section'>
            <h1>สำรวจชมรม</h1>
            <div className='flex flex-col gap-6 w-full'>
                {/* Top Section */}
                <div className='flex gap-4 w-full'>
                    <SearchBar className='flex-1' />
                    {/* Icon Filter Component */}
                </div>
                
                {/* Clubs Section */}
                <div className='grid grid-cols-3 gap-6'>
                    {data.map((club, idx) => (
                        <ClubCard key={idx} {...club} />
                    ))}
                </div>

            </div>
        </section>
    )
}

export default ClubsPage
