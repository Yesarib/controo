import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
// import { OAuthButtons } from "./oauth-signin";
import { signup } from "./action";
import Link from "next/link"

export default async function Login({
}: {
    searchParams: { message: string };
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        return redirect("/todos");
    }

    return (
        <section className="h-[calc(100vh-57px)] flex justify-center items-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>
                        The easiest way to create content. Create a new account to get started
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <form id="login-form" className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                minLength={6}
                                name="password"
                                id="password"
                                type="password"
                                required
                            />
                        </div>
                        <Button formAction={signup} className="w-full">
                            Sign Up
                        </Button>
                    </form>
                    { /* <OAuthButtons /> */}
                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline hover:text-primary">
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}