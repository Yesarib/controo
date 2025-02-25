'use client'

import { signOut } from "@/app/(home)/login/action";
import { getUserById } from "@/app/dashboard/supabase/user";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { UserProfiles } from "@/types/custom";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const { userId } = useUser();
  const [user, setUser] = useState<UserProfiles | null>(null);

  const getUser = async () => {
    if (!userId) return;
    const response = await getUserById(userId);
    setUser(response);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">Contro</span>
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user !== null ? (
            <form action={signOut} className="flex items-center gap-2">
              <p>{user.fullname}</p>
              <Button>Sign Out</Button>
            </form>
          ) : (
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}