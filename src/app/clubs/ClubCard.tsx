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
        <div className='w-full flex flex-col p-4 gap-4 bg-white border border-stroke rounded-[12px]'>
            <div className='w-full flex items-center justify-between'>
                {/* Left */}
                <div className='flex gap-3 items-center'>
                    <Image width={48} height={48} alt="club-profile" src={imageUrl} />
                    <div className='flex flex-col'>
                        <p className='font-semibold'>{name}</p>
                        <p className='text-text-gray text-[10px] sm:text-sm'>{tag}</p>
                    </div>
                </div>
                
                {/* Right */}
                <button className='flex gap-1 cursor-pointer px-2.5 py-1.5 rounded-full border-2 border-primary bg-white hover:bg-primary text-primary hover:text-white transition-all'>
                    <p>ติดตาม</p>
                    <Plus />
                </button>
            </div>

            {/* Description */}
            <p className='text-text-gray text-[10px] sm:text-sm w-full'>
                {description}
            </p>

            {/* Categories */}
            <div className='flex gap-2'>
            {categories.map((category, idx) => (
                <div 
                    key={idx} 
                    className="font-semibold text-[8px] sm:text-xs rounded-[4px] text-white px-3 py-1"
                    style={{
                        backgroundColor: category.color,
                    }}
                >
                    {category.name}
                </div>
            ))}
            </div>
        </div>
    )
}

export default ClubCard
