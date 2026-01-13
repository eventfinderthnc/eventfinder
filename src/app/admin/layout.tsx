import { Sidebar } from '@/components/admin/Sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 p-4">
                {children}
            </main>
        </div>
    )
}