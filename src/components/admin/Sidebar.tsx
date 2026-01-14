"use client"

import {
  DiamondPlus,
  Users,
  SidebarOpenIcon,
  SidebarCloseIcon,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import { useRouter, usePathname } from "next/navigation"

const menu = [
  {
    title: "Create Account",
    path: "/admin/create",
    icon: DiamondPlus,
  },
  {
    title: "Organizer Management",
    path: "/admin/list",
    icon: Users,
  },
]

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const sidebarRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () =>
      document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  return (
    <div
      ref={sidebarRef}
      className={clsx(
        "fixed inset-y-0 left-0 z-50 lg:relative",
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
          className="cursor-pointer"
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <SidebarCloseIcon /> : <SidebarOpenIcon />}
        </button>
      </div>

      {/* Menu */}
      <div className="pt-5 flex flex-col gap-2">
        {menu.map(({ title, path, icon: Icon }) => (
          <div
            key={path}
            className={clsx(
              "flex items-center px-2 py-2 sm:px-3 mx-3 sm:mx-4 rounded-lg cursor-pointer",
              pathname === path && "bg-white/15"
            )}
            onClick={() => {
              router.push(path)
            }}
          >
            <div className="w-10 flex justify-center">
              <Icon />
            </div>

            <span
              className={clsx(
                "whitespace-nowrap overflow-hidden truncate transition-all duration-300",
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