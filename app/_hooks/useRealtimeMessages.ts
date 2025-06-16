"use client";

import { useEffect, useState } from "react";
import { supabase } from "../_lib/supabase";
import { SingleMessageType } from "../_types/message-types";

export function useRealtimeMessages(conversationId: string) {
  const [messages, setMessages] = useState<SingleMessageType[]>([]);

  useEffect(() => {
    const channel = supabase
      .channel("messages-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as SingleMessageType]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  return messages;
}
