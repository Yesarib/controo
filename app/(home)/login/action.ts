'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function emailLogin(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error, data: user } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/login?message=Could not authenticate user')
    }

    const profile = await checkUser(user.user.id)

    if (profile && profile.length > 0) {
        revalidatePath('/', 'layout')
        redirect('/dashboard')
    } else {
        redirect('/complete-profile')
    }
}


export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/')
}

export async function checkUser(userId: string) {
    const supabase = await createClient();

    const { data: user, error} = await supabase.from('user_profiles').select('*').eq('authid', userId);

    if (error) {
        console.error(error);
        return null;
    }

    return user
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