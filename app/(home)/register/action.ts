'use server'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'


export async function signup(email: string, password: string) {
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
        console.error('Signup Error:', error);
        return;
    } 

    const { data: user, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
        console.error('User Error:', userError);
        return;
    }

    console.log('User Found:', user);
    return user;
}
export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/login')
}

/*
export async function oAuthSignIn(provider: Provider) {
    if (!provider) {
        return redirect('/login?message=No provider selected')
    }

    const supabase = createClient();
    const redirectUrl = getURL("/auth/callback")
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: redirectUrl,
        }
    })

    if (error) {
        redirect('/login?message=Could not authenticate user')
    }

    return redirect(data.url)
} */