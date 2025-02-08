import Header from "@/components/header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <Header />
            <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
    );
}
