import { AdminNavbar } from '@/components/admin/AdminNavbar'
import { Sidebar } from '@/components/admin/Sidebar'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative lg:flex h-screen overflow-hidden">
      {/* Sidebar (overlay) */}
      <Sidebar />

      {/* Main */}
      <main className="pl-16 sm:pl-20 lg:pl-0 flex flex-col lg:flex-1 h-full lg:min-w-0 w-full">
        <AdminNavbar />
        {/* Scroll area */}
        <div className="flex-1 overflow-y-auto relative">
          {children}
        </div>
      </main>
    </div>
  )
}