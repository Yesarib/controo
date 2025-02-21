/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { ContentInput } from "@/components/content-input"
import { useState } from "react";
import { newChat } from "../supabase/chat";
import { useUser } from "@/hooks/use-user";
import { newMessage } from "../supabase/message";
import { useRouter } from "next/navigation";


export default function DashboardPage() {
  const { userId } = useUser();
  const router = useRouter();
  const [generatedContent, setGeneratedContent] = useState('');
  const [message, setMessage] = useState('');

  const handleContent = async () => {
    if (!userId) return;

    const response = await newChat(userId, "new Title");
    if (!response?.id) return;

    const newChatId = response.id;

    const apiResponse = await fetch('/api/text-generator', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({ user_input: message })
    });
    if (!apiResponse.ok) {
      console.error('API isteği başarısız oldu');
      return;
    }

    const data = await apiResponse.json();
    setGeneratedContent(data[0].generated_text);

    await newMessage({ chat_id: newChatId, user_id: userId, content: data[0].generated_text, user_message: message });

    router.push(`/dashboard/chat/${newChatId}`);
  }

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <ContentInput setMessage={setMessage} handleSubmit={handleContent} />
    </div>
  )
}
