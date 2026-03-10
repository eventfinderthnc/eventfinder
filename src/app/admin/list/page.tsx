"use client"

import { ConfirmModal } from "@/components/modal/ConfirmModal"
import { SearchBar } from "@/components/ui/SearchBar"
import { Trash2, ChevronLeft, ChevronRight, SquareMousePointerIcon } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

const data = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    name: "Thailand Incubator Club",
    email: "thicclub@gmail.com",
}))

export default function AdminListPage() {
    const [page, setPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(7)

    const [openDelete, setOpenDelete] = useState(false)
    const [selectedId, setSelectedId] = useState<number | null>(null)       

    useEffect(() => {
        const calculateItemsPerPage = () => {
            const viewportHeight = window.innerHeight

            const HEADER_HEIGHT = 64          // AdminNavbar
            const PAGE_HEADER = 120           // title + search
            const PAGINATION = 80             // pagination
            const PADDING = 40                // py-5
            const ROW_HEIGHT = 64             // 1 row ของ table
            const BRUH = 100

            const availableHeight =
            viewportHeight -
            HEADER_HEIGHT -
            PAGE_HEADER -
            PAGINATION -
            PADDING -
            BRUH

            const count = Math.floor(availableHeight / ROW_HEIGHT)

            setItemsPerPage(Math.max(5, Math.min(count, 10)))
            setPage(1)
        }

        calculateItemsPerPage()
        window.addEventListener("resize", calculateItemsPerPage)

        return () => window.removeEventListener("resize", calculateItemsPerPage)
    }, [])

    const totalPages = Math.ceil(data.length / itemsPerPage)
    const startIndex = (page - 1) * itemsPerPage
    const pageData = data.slice(startIndex, startIndex + itemsPerPage)

    return (
        <div className="text-sm sm:text-base relative w-full h-full flex flex-col gap-5 px-5 sm:px-10 lg:pr-25 py-5">
            {/* Header */}
            <div className="w-full flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                <h1>จัดการบัญชีของชมรม</h1>
                <div className="w-full lg:w-130">
                    <SearchBar />
                </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg border-stroke overflow-x-auto">
                {/* Table Header */}
                <div className="grid grid-cols-[1.5fr_0.3fr] sm:grid-cols-[1.5fr_1fr_0.3fr] lg:grid-cols-[1.5fr_1fr_1fr] px-6 py-4 border-b font-medium border-stroke">
                <div className="truncate">รายการบัญชี</div>
                <div className="hidden sm:flex truncate">อีเมล</div>
                <div className="hidden sm:flex text-right"></div>
                </div>

                {/* Rows */}
                {pageData.map((item) => (
                <div
                    key={item.id}
                    className="grid grid-cols-[1.3fr_0.3fr] sm:grid-cols-[1.5fr_1fr_0.3fr] lg:grid-cols-[1.5fr_1fr_1fr] px-3 py-4 sm:px-6 sm:py-4 items-center border-b last:border-b-0 border-stroke"
                >
                    {/* Name */}
                    <div className="flex items-center gap-4">
                    <div className="hidden sm:flex sm:w-10 sm:h-10 rounded-full bg-gray-600 items-center justify-center shrink-0">
                        <Image src="/lightbulb.svg" alt="logo" width={20} height={20} />
                    </div>
                    <span className="font-medium truncate">{item.name}</span>
                    </div>

                    {/* Email */}
                    <div className="hidden sm:flex text-gray-700 truncate">{item.email}</div>

                    {/* Actions */}
                    <div className="flex justify-end gap-1 sm:gap-3">
                    <button className="cursor-pointer flex items-center gap-2 px-2 lg:px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
                        <span className="hidden lg:flex truncate">ดูโพสต์</span>
                        <SquareMousePointerIcon size={18} className="text-blue-600" />
                    </button>

                    <button 
                        className="cursor-pointer flex items-center gap-2 px-2 lg:px-4 py-2 border rounded-lg text-gray-700 hover:bg-red-50"
                         onClick={() => {
                            setSelectedId(item.id)
                            setOpenDelete(true)
                        }}
                    >
                        <span className="hidden lg:flex truncate">ลบบัญชี</span>
                        <Trash2 size={18} className="text-red-600" />
                    </button>
                    </div>
                </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex absolute bottom-0 right-0 pr-5 pb-8 sm:pb-10 sm:pr-10 lg:pr-25 justify-end items-center gap-4 text-gray-600">
                <span>{page} จาก {totalPages}</span>

                <button
                    className="p-1 hover:bg-gray-100 rounded"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                >
                <ChevronLeft />
                </button>

                <button
                    className="p-1 hover:bg-gray-100 rounded"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                >
                <ChevronRight />
                </button>
            </div>

            {/* Delete Popup */}
            <ConfirmModal
                open={openDelete}
                title="ลบบัญชีชมรม"
                description="คุณแน่ใจหรือไม่ว่าต้องการลบบัญชีนี้?"
                confirmText="ลบ"
                cancelText="ยกเลิก"
                onCancel={() => setOpenDelete(false)}
                onConfirm={() => {
                    if (selectedId !== null) {
                    console.log("delete id:", selectedId)
                    // call API delete here
                    }
                    setOpenDelete(false)
                }}
            />
        </div>
    )
}