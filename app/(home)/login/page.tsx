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
import { emailLogin } from "./action";
import Link from "next/link"

export default async function Login() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        return redirect("/");
    }

    return (
        <section className="h-[calc(100vh-57px)] flex justify-center items-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <form id="login-form" className="grid gap-4">
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
                        <Button formAction={emailLogin} className="w-full">
                            Login
                        </Button>
                    </form>
                    { /* <OAuthButtons /> */}
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="underline hover:text-primary">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}