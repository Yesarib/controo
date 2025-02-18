'use server'

import { Messages } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";



export async function newMessage(message: Messages) {
    const supabase = await createClient();
    console.log(message);

    const { data, error } = await supabase.from('messages')
        .insert({
            chat_id: message.chat_id,
            user_id: message.user_id,
            content: message.content,
            user_message: message.user_message
        }).select();

    if (error) {
        console.error('Error fetching chat:', error);
        return [];
    }

    return data[0];
}

export async function getMessagesByChatId(chatId: string) {
    const supabase = await createClient();
    
    const { data, error } = await supabase.from('messages').select('*').eq('chat_id', chatId);

    if (error) {
        console.error('Error fetching chat:', error);
        return [];
    }

    return data;
}

export async function deleteMessagesByChatId(chatId: string) {
    const supabase = await createClient();
    
    const { error } = await supabase.from('messages').delete().eq('chat_id', chatId);

    if (error) {
        console.error('Error fetching chat:', error);
        return false;
    }

    return true;
}