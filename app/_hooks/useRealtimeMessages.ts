"use client";

import { useEffect } from "react";
import { supabase } from "../_lib/supabase";
import { SingleMessageType } from "../_types/message-types";
import { useQueryClient } from "@tanstack/react-query";

export function useRealtimeMessages(conversationId: string) {
  const queryClient = useQueryClient();

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

          // Update cached messages
          queryClient.setQueryData<SingleMessageType[]>(
            ["messages", conversationId],
            (oldMessages = []) => {
              const exists = oldMessages.find((msg) => msg.id === newMessage.id);
              if (exists) return oldMessages;
              return [...oldMessages, newMessage];
            }
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, queryClient]);
}
