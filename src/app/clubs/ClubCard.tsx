import { Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

export interface Category {
    name: string;
    color: string;
}

export interface ClubCardProps {
    name: string;
    description: string;
    tag: string;
    imageUrl: string;
    categories: Category[];
}

const ClubCard = (props: ClubCardProps) => {
    const { name, description, tag, imageUrl, categories } = props;

    return (
        <div className='w-full flex flex-col px-3 py-5 sm:p-4 gap-3 sm:gap-4 bg-white border border-stroke rounded-[12px]'>
            <div className='w-full flex items-center justify-between'>
                {/* Left */}
                <div className='flex gap-2 sm:gap-3 items-center w-full'>
                    <Image width={48} height={48} alt="club-profile" src={imageUrl} />
                    <div className='flex flex-col'>
                        <p className='font-semibold'>{name}</p>
                        <p className='text-text-gray text-[10px] sm:text-sm'>{tag}</p>
                    </div>
                </div>
                
                {/* Right */}
                <button 
                    className='hidden lg:flex items-center gap-1 cursor-pointer px-2.5 py-1.5 rounded-full border-2 border-primary bg-white hover:bg-primary text-primary hover:text-white transition-all'
                >
                    <p>ติดตาม</p>
                    <Plus size={16}/>
                </button>
            </div>

            {/* Description */}
            <p className='text-text-gray text-[10px] sm:text-sm w-full line-clamp-2'>
                {description}
            </p>

            {/* Categories */}
            <div className='flex gap-1 sm:gap-2 w-full flex-wrap items-center'>
            {categories.map((category, idx) => (
                <div 
                    key={idx} 
                    className="font-semibold text-[8px] sm:text-xs rounded-[4px] text-white px-2 sm:px-3 py-1"
                    style={{
                        backgroundColor: category.color,
                    }}
                >
                    {category.name}
                </div>
            ))}
            </div>

            {/* Follow Button for tablet and mobile*/}
            <button 
                className='flex items-center justify-center lg:hidden gap-1 cursor-pointer px-2.5 py-1 sm:py-1.5 rounded-full border-2 border-primary bg-white hover:bg-primary text-primary hover:text-white transition-all'
            >
                <p className='text-sm sm:text-base'>ติดตาม</p>
                <Plus size={16} />
            </button>
        </div>
    )
}

export default ClubCard
