"use client"

import { DiamondPlus, Users, SidebarOpenIcon, SidebarCloseIcon } from "lucide-react"
import { useState } from "react"
import clsx from "clsx"
import { useRouter } from "next/navigation"

const menu = [
  {
      title: "Create Account",
      path: "/admin/create",
      icon: DiamondPlus
  },
  {
      title: "Organizer Management",
      path: "/admin/list",
      icon: Users
  },
]

export const Sidebar = () => {
  
    const [isOpen, setIsOpen] = useState(false)
    const [page, setPage] = useState("/admin/list")
  
    const router = useRouter();

    return (
        <div
            className={clsx(
                "h-screen bg-primary text-white flex flex-col",
                "transition-[width] duration-300 ease-in-out overflow-hidden",
                isOpen ? "w-70 sm:w-85" : "w-16 sm:w-20"
            )}
        >
        {/* Top */}
        <div className="text-sm sm:text-base flex items-center justify-between h-16 sm:h-19 px-2 sm:px-3 border-b border-stroke mx-3 sm:mx-4">
            <span
                className={clsx(
                "text-base sm:text-lg font-semibold whitespace-nowrap overflow-hidden transition-all duration-300 truncate",
                isOpen
                    ? "opacity-100 translate-x-0 max-w-50"
                    : "opacity-0 -translate-x-2 max-w-0"
                )}
            >
                Admin Dashboard
            </span>
            <button
                className=" cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <SidebarCloseIcon /> : <SidebarOpenIcon />}
            </button>
        </div>

        {/* Menu */}
        <div className="pt-5 flex flex-col gap-2">
            {menu.map(({ title, path, icon: Icon }, index) => (
            <div
                key={index}
                className={clsx(
                    "flex items-center px-2 py-2 sm:px-3 mx-3 sm:mx-4 rounded-lg cursor-pointer",
                    path == page && "bg-white/15"
                )}
                onClick={() => {
                    router.push(path)
                    setPage(path)
                }}
            >
                <div className="w-10 flex justify-center">
                <Icon />
                </div>

                <span
                className={clsx(
                    "whitespace-nowrap overflow-hidden truncate",
                    "transition-all duration-300",
                    isOpen
                    ? "opacity-100 translate-x-0 max-w-50"
                    : "opacity-0 -translate-x-2 max-w-0"
                )}
                >
                    {title}
                </span>
            </div>
            ))}
        </div>
        </div>
    )
}