"use client";

import { Messages, SingleMessageType } from "@/app/_types/message-types";
import SingleMessage from "./SingleMessage";
import { useRealtimeMessages } from "@/app/_hooks/useRealtimeMessages";
import { useEffect, useMemo, useRef } from "react";
import { User } from "@/app/_types/users-type";

type Props = {
  messages: Messages;
  conversationId: string;
  participants: User[] | any[];
  user: any;
};

export default function MessagesContent({
  messages,
  conversationId,
  participants,
  user,
}: Props) {
  const realtimeMessages = useRealtimeMessages(conversationId);
  const displayedMessages = useMemo(
    () => [...messages, ...realtimeMessages],
    [messages, realtimeMessages]
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
