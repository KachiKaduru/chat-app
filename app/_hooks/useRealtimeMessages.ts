"use client";

import { useEffect, useState } from "react";
import { supabase } from "../_lib/supabase";
import { SingleMessageType } from "../_types/message-types";

export function useRealtimeMessages(conversationId: string) {
  const [messages, setMessages] = useState<SingleMessageType[]>([]);

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMessage = payload.new as SingleMessageType;
          setMessages((prev) => {
            const exists = prev.find((m) => m.id === newMessage.id);
            return exists ? prev : [...prev, newMessage];
          });
          // setMessages((prev) => {
          //   const exists = prev.find((m) => m.id === newMessage.id);
          //   return exists ? prev : [...prev, newMessage];
          // });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  return messages;
}
