import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex min-h-screen ">
            <aside className="w-64 h-full"> <Sidebar /> </aside>
            <main className="w-full bg-[#343541] overflow-auto">{children}</main>
        </div>
    );
}
