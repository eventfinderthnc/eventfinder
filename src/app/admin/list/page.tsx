"use client"

import { SearchBar } from "@/components/ui/SearchBar"
import { Trash2, FileText, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const ITEMS_PER_PAGE = 7

const data = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  name: "Thailand Incubator Club",
  email: "thicclub@gmail.com",
}))

export default function AdminListPage() {
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE)

  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const pageData = data.slice(startIndex, endIndex)

  return (
    <div className="relative h-full overflow-y-auto flex flex-col gap-5 pl-10 pr-25 py-5">
      <div className="flex items-center justify-between">
        <h1>จัดการบัญชีของชมรม</h1>
        <div className="w-130">
          <SearchBar />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden border-stroke">
        {/* Table Header */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr] px-6 py-4 border-b font-medium border-stroke">
          <div>รายการบัญชี</div>
          <div>อีเมล</div>
          <div className="text-right"> </div>
        </div>

        {/* Rows */}
        {pageData.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[1.5fr_1fr_1fr] px-6 py-4 items-center border-b last:border-b-0 border-stroke"
          >
            {/* Name */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                <Image
                  src="/lightbulb.svg"
                  alt="logo"
                  width={20}
                  height={20}
                />
              </div>
              <span className="font-medium">{item.name}</span>
            </div>

            {/* Email */}
            <div className="text-gray-700">{item.email}</div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
                ดูโพสต์
                <FileText size={18} className="text-blue-600" />
              </button>

              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-red-50">
                ลบบัญชี
                <Trash2 size={18} className="text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="absolute flex justify-end items-center gap-4 bottom-0 right-0 pb-10 pr-25 text-gray-600">
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
    </div>
  )
}