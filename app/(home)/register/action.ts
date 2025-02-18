'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
// import { Provider } from '@supabase/supabase-js'
// import { getURL } from '@/utils/helpers'

export async function saveUser(userId: string, fullName: string) {
    const supabase = await createClient();

    supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
            try {
                // Kullanıcı oturumu açıldığında, profile'ı kaydediyoruz
                const { error } = await supabase
                    .from('user_profiles')
                    .insert([{
                        authId: session.user.id,
                        fullname: fullName
                    }]);

                if (error) {
                    console.error('Error saving user profile:', error);
                }
            } catch (error) {
                console.error('Profile creation error:', error);
            }
        } else {
            console.log('User is not signed in yet or email not verified');
        }
    });
}

export async function signup(email: string, password: string, fullName: string) {
    const supabase = await createClient()

    const { data: authData, error } = await supabase.auth.signUp({ email, password })

    if (error) {
        console.error('Signup Error:', error)
        return;
    }

    console.log('Auth Data:', authData);

    const user = authData?.user

    if (user) {
        console.log('User Found:', user);
        await saveUser(user.id, fullName)
    } else {
        console.log('No user found in authData');
    }

    revalidatePath('/', 'layout')
    redirect('/')
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