"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FormInput } from "@/components/ui/FormInput"

export default function AdminCreate() {
  const router = useRouter()

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.email || !form.password) {
      return setError("กรุณากรอกข้อมูลให้ครบ")
    }

    setError("")

    // call API create account
    console.log("Create account:", form)

    router.push("/admin/list")
  }

  return (
    <div className="text-sm sm:text-base w-full mt-30 flex items-center justify-center">
      <div className="w-5/6 sm:w-full sm:max-w-sm bg-white border border-stroke rounded-lg px-6 py-8 flex flex-col gap-5">
        <h1 className="text-xl sm:text-2xl">สร้างบัญชี Organizer</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">อีเมล</label>
            <FormInput
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">รหัสผ่าน</label>
            <FormInput
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
            >
              สร้างบัญชี
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}