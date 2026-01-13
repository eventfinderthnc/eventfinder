import Image from "next/image"

export const AdminNavbar = () => {

    return (
        <div className="text-sm sm:text-base flex items-center justify-end w-full pl-6 sm:pr-25 px-5 h-16 sm:h-19 shadow-[0_1px_4px_rgba(217,217,217,1)]">
            <div className="flex gap-3 sm:gap-6 items-center">
                <span className="text-text-gray truncate">ออกจากระบบ</span>
                <Image 
                    src="/images/Profile.svg"
                    alt="profile"
                    width={40}
                    height={40}
                    className="h-7 sm:h-10 w-auto"
                />
            </div>
        </div>
    )
}