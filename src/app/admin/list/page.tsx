"use client"

import { ConfirmModal } from "@/components/modal/ConfirmModal"
import { SearchBar } from "@/components/ui/SearchBar"
import { Trash2, ChevronLeft, ChevronRight, SquareMousePointerIcon, UserRound } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { api } from "@/trpc/react"

export default function AdminListPage() {
    const [page, setPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(7)
    const [searchQuery, setSearchQuery] = useState("")

    const [openDelete, setOpenDelete] = useState(false)
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const { data: organizers = [], isLoading, refetch } = api.user.getOrganizerUser.useQuery()
    
    const deleteOrganizer = api.user.delete.useMutation({
        onSuccess: async () => {
            await refetch()
        },
    })

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

    const data = organizers.map((item) => ({
        id: item.id,
        name: item.name?.trim() ? item.name : "Organizer",
        email: item.email,
        image: item.image ?? null,
    }))

    const filteredData = searchQuery.trim()
        ? data.filter((item) => {
              const q = searchQuery.toLowerCase()
              const matchName = Boolean(item.name.toLowerCase().includes(q))
              const matchEmail = Boolean(item.email.toLowerCase().includes(q))
              return matchName || matchEmail
          })
        : data

    const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage))
    const startIndex = (page - 1) * itemsPerPage
    const pageData = filteredData.slice(startIndex, startIndex + itemsPerPage)

    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages)
        }
    }, [page, totalPages])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        setPage(1)
    }

    return (
        <div className="text-sm sm:text-base relative w-full h-full flex flex-col gap-5 px-5 sm:px-10 lg:pr-25 py-5">
            {/* Header */}
            <div className="w-full flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                <h1>จัดการบัญชีของชมรม</h1>
                <div className="w-full lg:w-130">
                    <SearchBar
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="ค้นหาชื่อหรืออีเมล"
                    />
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
                {isLoading && (
                    <div className="px-6 py-6 text-gray-500">กำลังโหลดข้อมูล...</div>
                )}

                {!isLoading && pageData.length === 0 && (
                    <div className="px-6 py-6 text-gray-500">
                        {searchQuery.trim() ? `ไม่พบผลลัพธ์สำหรับ "${searchQuery}"` : "ยังไม่มีบัญชีผู้จัดกิจกรรม"}
                    </div>
                )}

                {!isLoading && pageData.map((item) => (
                <div
                    key={item.id}
                    className="grid grid-cols-[1.3fr_0.3fr] sm:grid-cols-[1.5fr_1fr_0.3fr] lg:grid-cols-[1.5fr_1fr_1fr] px-3 py-4 sm:px-6 sm:py-4 items-center border-b last:border-b-0 border-stroke"
                >
                    {/* Name */}
                    <div className="flex items-center gap-4">
                    <div className="hidden sm:flex sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200 items-center justify-center shrink-0">
                        {item.image ? (
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <UserRound size={20} className="text-gray-400" />
                        )}
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
                        deleteOrganizer.mutate({ id: selectedId })
                    }
                    setOpenDelete(false)
                }}
            />
        </div>
    )
}