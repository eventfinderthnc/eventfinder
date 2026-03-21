"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "@/lib/auth-client"

export const AdminNavbar = () => {
    const { data: session } = useSession()
    const router = useRouter()

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => router.push("/"),
            },
        })
    }

    const userImage = session?.user?.image ?? "/images/Profile.svg"

    return (
        <div className="text-sm sm:text-base flex items-center justify-end w-full px-5 sm:px-10 lg:pr-25 h-16 sm:h-19 shadow-[0_1px_4px_rgba(217,217,217,1)]">
            <div className="flex gap-3 sm:gap-6 items-center">
                <button
                    onClick={handleSignOut}
                    className="text-text-gray hover:text-red-500 transition-colors cursor-pointer whitespace-nowrap"
                >
                    ออกจากระบบ
                </button>
                <Image
                    src={userImage}
                    alt="profile"
                    width={40}
                    height={40}
                    className="h-7 sm:h-10 w-auto rounded-full object-cover"
                />
            </div>
        </div>
    )
}