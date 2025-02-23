'use server';

import { createClient } from "@/utils/supabase/server";

export async function getUserById(userId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.from('user_profiles').select('*').eq('authid', userId);

    if (error) {
        console.error(error);
        return null;
    }

    return data[0];
}