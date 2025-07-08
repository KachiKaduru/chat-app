"use client";

import { useEffect, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/app/_lib/actions/chat-actions";

import { User, Users } from "@/app/_types/users-type";
import { SingleMessageType } from "@/app/_types/message-types";

import { useRealtimeMessages } from "@/app/_hooks/useRealtimeMessages";
import SingleMessage from "./SingleMessage";

type Props = {
  conversationId: string;
  participants: Users;
  user: User;
};

export default function MessagesContent({ conversationId, participants, user }: Props) {
  const { data: initialMessages = [] } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId),
  });
  const realtimeMessages = useRealtimeMessages(conversationId);
  const displayedMessages = useMemo(
    () => [...initialMessages, ...realtimeMessages],
    [initialMessages, realtimeMessages]
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  function getMessageSender(sender_id: string) {
    const sender = participants.filter((item) => item.id === sender_id);
    return sender[0];
  }

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayedMessages]);

  if (!conversationId) return null;

  return (
    <section className="overflow-auto h-full pb-4 bg-white">
      <div className="flex flex-col gap-2">
        {displayedMessages.map((message: SingleMessageType) => (
          <SingleMessage
            key={message.sent_at}
            sender={getMessageSender(message.sender_id)}
            user={user}
          >
            {message.content}
          </SingleMessage>
        ))}
      </div>
      <div ref={messagesEndRef} />
    </section>
  );
}
