import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { UserProvider } from "@/context/user-context";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Todo App",
  description: "An example of Supabase, Auth and NextJS server actions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.variable}>
      <body className="sticky top-0 bg-background text-foreground">
        <UserProvider>
          <main className="flex flex-col items-center">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}