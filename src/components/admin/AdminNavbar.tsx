import Image from "next/image"

export const AdminNavbar = () => {

    return (
        <div className="text-sm sm:text-base flex items-center justify-end w-full pl-6 pr-25 h-19 gap-2.5 shadow-[0_1px_4px_rgba(217,217,217,1)]">
            <div className="flex gap-6 items-center">
                <span className="text-text-gray">ออกจากระบบ</span>
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