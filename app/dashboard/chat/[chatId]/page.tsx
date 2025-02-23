/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useUser } from "@/hooks/use-user";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getMessagesByChatId, newMessage } from "../../supabase/message";
import { Messages } from "@/types/custom";
import { ContentInput } from "@/components/content-input";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Loading from "@/components/loading";

export default function ChatPage() {
  const [messagesFromSupabase, setMessagesFromSupabase] = useState<Messages[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  const params = useParams();
  const chatId = params.chatId;
  const { userId } = useUser();
  const [showScrollButton, setShowScrollButton] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" });
  };

  const getChatUserMessages = async () => {
    if (!chatId) return;
    setIsChatLoading(true);
    const response = await getMessagesByChatId(chatId as string);
    if (!response) return;
    setMessagesFromSupabase(response);
    setIsChatLoading(false);
  };

  const handleContent = async () => {
    if (!userId || !message.trim()) return;

    setIsLoading(true); // Loading başlat

    try {
      const apiResponse = await fetch('/api/text-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_input: message }),
      });

      if (!apiResponse.ok) {
        console.error('API isteği başarısız oldu');
        return;
      }

      const data = await apiResponse.json();
      const generatedContent = data[0].generated_text;

      const userRequestIndex = generatedContent.indexOf(`User request: "${message}"`);
      const contentAfterUserInput = userRequestIndex !== -1
        ? generatedContent.substring(userRequestIndex + `User request: ${message} "`.length).trim()
        : generatedContent;

      await newMessage({ chat_id: chatId as string, user_id: userId, content: contentAfterUserInput, user_message: message });
      setMessage("");
      getChatUserMessages();
    } catch (error) {
      console.error("Mesaj gönderme hatası:", error);
    } finally {
      setIsLoading(false); // İşlem bitince loading durdur
    }
  };

  useEffect(() => {
    getChatUserMessages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!chatContainerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      setShowScrollButton(scrollTop + clientHeight < scrollHeight - 10);
    };

    const chatDiv = chatContainerRef.current;
    if (chatDiv) {
      chatDiv.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatDiv) {
        chatDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messagesFromSupabase]);

  return (
    <div className="w-full h-screen flex flex-col overflow-y-auto">
      <div ref={chatContainerRef} className="flex-1 flex flex-col items-center p-4">
        {isChatLoading ? (
          <Loading width="500" isSidebar={false} />
        ) : (
          <div className="w-1/2 flex flex-col space-y-4">
            {messagesFromSupabase.map((message) => (
              <div key={message.id} className="flex flex-col text-white space-y-2">
                <div className="flex justify-end">
                  <p className="bg-[#404150] p-4 rounded-xl">{message.user_message}</p>
                </div>
                <div className="flex justify-start">
                  <div dangerouslySetInnerHTML={{ __html: message.content }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full sticky bottom-0 p-4">
        <ContentInput setMessage={setMessage} handleSubmit={handleContent} isNewMessage={false} isLoading={isLoading} />
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="fixed h-16 bottom-4 right-4 bg-blue-500 p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          <KeyboardArrowDownIcon sx={{ color: 'white' }} />
        </button>
      )}
    </div>
  );
}
