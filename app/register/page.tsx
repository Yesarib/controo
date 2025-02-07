/* eslint-disable @next/next/no-async-client-component */
'use client'
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
import { createClient } from "@/utils/supabase/server";
// import { OAuthButtons } from "./oauth-signin";
import { signup } from "./action";
import Link from "next/link"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Login({ }: { searchParams: { message: string }; }) {
    const router = useRouter()

    const supabase = createClient();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = async () => {
        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        name: formData.name 
                    }
                }
            })
            console.log(authData);

            if (authError) throw authError;

            // Email doğrulaması için yönlendirme
            // router.push('/verify-email') // Bu sayfayı oluşturmanız gerekecek
        } catch (error) {
            console.error('Registration error:', error)
        }
    }

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                try {
                    // User meta datasından name bilgisini al
                    const name = session.user.user_metadata.name

                    const { error: profileError } = await supabase
                        .from('user_profiles')
                        .insert([
                            {
                                authId: session.user.id,
                                fullname: name
                            }
                        ])

                    if (profileError) throw profileError;

                    router.push('/dashboard')
                } catch (error) {
                    console.error('Profile creation error:', error)
                }
            }
        })

        // Cleanup subscription
        return () => {
            subscription.unsubscribe()
        }
    }, [])

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
                                value={formData.name}
                                onChange={handleChange}
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
                                value={formData.email}
                                onChange={handleChange}
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
                                value={formData.password}
                                onChange={handleChange}
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
                        <Link onClick={handleRegister} href="/login" className="underline hover:text-primary">
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}