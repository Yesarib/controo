'use server'

import { Messages } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";



export async function newMessage(message: Messages){
    const supabase = await createClient();
    console.log(message);
    
    const { data, error } = await supabase.from('messages')
    .insert({
        chat_id: message.chat_id,
        user_id: message.user_id,
        content: message.content
    }).select();

    if (error) {
        console.error('Error fetching chat:', error);
        return [];
    }
    
    return data[0] ;
}