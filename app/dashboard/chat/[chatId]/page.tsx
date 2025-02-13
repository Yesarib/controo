/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useUser } from "@/hooks/use-user";
import { useParams } from "next/navigation";
import { useState } from "react";
import { newChat } from "../../supabase/chat";
import { newMessage } from "../../supabase/message";

export default function ChatPage() {
  const params = useParams();
  const chatId = params.chatId;
  const { userId } = useUser();


  return (
    <div>

    </div>
  )
}
