"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/app/_lib/actions/chat-actions";

import { User } from "@/app/_types/users-type";
import { SingleMessageType } from "@/app/_types/message-types";

import { useRealtimeMessages } from "@/app/_hooks/useRealtimeMessages";
import SingleMessage from "./SingleMessage";

type Props = {
  conversationId: string;
  participants: any[];
  user: User;
  isGroup: boolean;
};

export default function MessagesContent({ conversationId, participants, user, isGroup }: Props) {
  const { data: messages = [] } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId),
  });

  useRealtimeMessages(conversationId); // Just subscribe, don’t return messages

  const messagesEndRef = useRef<HTMLDivElement>(null);

  function getMessageSender(sender_id: string) {
    const sender = participants.find((item) => item?.id === sender_id);
    return sender;
  }

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!conversationId) return null;

  return (
    <section className="overflow-auto h-full px-2 pt-1 pb-4  bg-white">
      <div className={`flex flex-col ${isGroup ? "gap-3" : "gap-2"}`}>
        {messages.map((message: SingleMessageType) => (
          <SingleMessage
            key={message.sent_at}
            sender={getMessageSender(message.sender_id)}
            user={user}
            isGroup={isGroup}
          >
            {message.content}
          </SingleMessage>
        ))}
      </div>
      <div ref={messagesEndRef} />
    </section>
  );
}
