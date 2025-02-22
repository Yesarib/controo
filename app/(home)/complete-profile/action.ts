'use server'
import { createClient } from "@/utils/supabase/server";

export async function checkUser() {
    const supabase = await createClient();

    const { data: session, error } = await supabase.auth.getSession();
    console.log(session);
    
    if (error || !session?.session?.user) {
        console.error("Kullanıcı doğrulanamadı.", error);
    }

    return session?.session?.user
}

export async function completeProfile(fullName: string, subscriptionPlan: number) {
    const supabase = await createClient()

    try {
        const { data: user, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return { success: false, message: "User not found!" };
        }

        const { error } = await supabase
            .from("user_profiles")
            .insert([{
                authid: user.user.id,
                fullname: fullName,
                subscription_id: subscriptionPlan
            }]);

        if (error) {
            return { success: false, message: error.message };
        }

        return { success: true, message: "Registration successful" };

    } catch (error) {
        console.log(error);
        
        return { success: false, message: "Unknown error" };
    }
}

export async function getSubscriptionPlans() {
    const supabase = await createClient();

    const { data: subscriptionPlans, error } = await supabase
        .from("subscriptions")
        .select("*");

    if (error) {
        console.error(error);
        return [];
    }

    return subscriptionPlans;
}