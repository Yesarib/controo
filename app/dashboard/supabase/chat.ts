'use server'

import { createClient } from "@/utils/supabase/server";
// import { format } from "date-fns";

export async function getUserChats(userId: string) {
    const supabase = await createClient();

    // const today = format(new Date(), 'yyyy-MM-dd');
    // const last7Days = format(new Date(new Date().setDate(new Date().getDate() - 7)), 'yyyy-MM-dd');
    // const last30Days = format(new Date(new Date().setDate(new Date().getDate() - 30)), 'yyyy-MM-dd');

    const { data, error } = await supabase.from('chats')
        .select('*').eq('user_id', userId);

    if (error) {
        console.error('Error fetching chat:', error);
        return [];
    }

    return data ?? [];
};

export async function newChat(userId: string, title: string) {
    const supabase = await createClient();

    const { error } = await supabase.from('chats')
        .insert({ user_id: userId, title: title });

    if (error) {
        console.error('Error creating chat:', error);
    }

};

export async function deleteChat(chatId: string) {
    const supabase = await createClient();

    const { error } = await supabase.from('chats')
        .delete().eq('id', chatId);

    if (error) {
        console.error('Error deleting chat:', error);
    }

};