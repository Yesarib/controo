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
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContent = async () => {
    if (!userId || isLoading) return;

    setIsLoading(true);
    const words = message.split(' ').slice(0, 5).join(' '); 
    const trimmedMessage = words.length > 50 ? words.slice(0, 50) + "..." : words;

    const response = await newChat(userId, trimmedMessage);
    if (!response?.id) {
      setIsLoading(false);
      return;
    }

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
      setIsLoading(false);
      return;
    }

    const data = await apiResponse.json();
    const generatedContent = data[0].generated_text;

    const userRequestIndex = generatedContent.indexOf(`User request: "${message}"`);
    const contentAfterUserInput = userRequestIndex !== -1 ? generatedContent.substring(userRequestIndex + `User request: ${message} "`.length).trim() : generatedContent;

    await newMessage({ chat_id: newChatId, user_id: userId, content: contentAfterUserInput, user_message: message });

    setIsLoading(false);
    router.push(`/dashboard/chat/${newChatId}`);
  }

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <ContentInput setMessage={setMessage} handleSubmit={handleContent} isLoading={isLoading} />
    </div>
  )
}
