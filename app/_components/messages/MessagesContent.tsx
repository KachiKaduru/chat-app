"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/app/_lib/actions/chat-actions";
import { User } from "@/app/_types/users-type";
import { SingleMessageType } from "@/app/_types/message-types";
import { useRealtimeMessages } from "@/app/_hooks/useRealtimeMessages";
import SingleMessage from "./SingleMessage";
import Spinner from "../Spinner";
import { FiLock } from "react-icons/fi";

type Props = {
  conversationId: string;
  participants: User[];
  user: User;
  isGroup: boolean;
};

export default function MessagesContent({ conversationId, participants, user, isGroup }: Props) {
  const [isConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  function getMessageSender(sender_id: string) {
    return participants.find((item) => item?.id === sender_id);
  }

  // Only enable realtime when initial load is complete
  useRealtimeMessages(isLoading ? null : conversationId);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!conversationId) return null;
  if (isLoading) return <Spinner />;

  return (
    <section className="overflow-auto h-full px-2 pt-1 pb-4">
      {!isConnected && (
        <div className="text-center text-sm text-gray-500 py-2 flex justify-center items-center gap-1.5">
          <span>Secure and private conversations</span>
          <FiLock />
        </div>
      )}

      <div className={`flex flex-col ${isGroup ? "gap-3" : "gap-2"}`}>
        {messages.map((message: SingleMessageType) => (
          <SingleMessage
            key={`${message.id}-${message.sent_at}`}
            sender={getMessageSender(message.sender_id) as User}
            user={user}
            isGroup={isGroup}
            timestamp={message.sent_at}
          >
            {message.content}
          </SingleMessage>
        ))}
      </div>
      <div ref={messagesEndRef} />
    </section>
  );
}
