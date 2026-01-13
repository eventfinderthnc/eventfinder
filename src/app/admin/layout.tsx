import { AdminNavbar } from '@/components/admin/AdminNavbar'
import { Sidebar } from '@/components/admin/Sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex flex-col flex-1 h-full">
        <AdminNavbar />

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}