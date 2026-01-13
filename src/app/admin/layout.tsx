import { AdminNavbar } from '@/components/admin/AdminNavbar'
import { Sidebar } from '@/components/admin/Sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1">
                <AdminNavbar />
                {children}
            </main>
        </div>
    )
}