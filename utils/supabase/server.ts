"use server"

import { Database } from '@/types/supabase'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
    const cookieStore = await cookies()

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                async get(name: string) {
                    return (await cookieStore).get(name)?.value
                },
                async set(name: string, value: string, options: CookieOptions) {
                    try {
                        (await cookieStore).set({ name, value, ...options })
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    } catch (error) {
                        // The `set` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
                async remove(name: string, options: CookieOptions) {
                    try {
                        (await cookieStore).set({
                            name,
                            value: '',
                            ...options,
                            maxAge: -1
                        })
                    } catch (error) {
                        console.error("Error removing cookie:", error);
                    }
                }
            },
        }
    )
}