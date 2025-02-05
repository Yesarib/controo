export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <aside className="w-64 bg-gray-800 text-white p-4">Dashboard Sidebar</aside>
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
