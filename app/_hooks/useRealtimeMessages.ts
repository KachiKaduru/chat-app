"use client";

import { useEffect, useRef } from "react";
import { supabase } from "../_lib/supabase";
import { SingleMessageType } from "../_types/message-types";
import { useQueryClient } from "@tanstack/react-query";

export function useRealtimeMessages(conversationId: string | null) {
  const queryClient = useQueryClient();
  const channelRef = useRef<ReturnType<typeof supabase.channel>>(null);

  useEffect(() => {
    if (!conversationId) return;

    // Clean up any existing channel
    const cleanup = () => {
      if (channelRef.current) {
        supabase
          .removeChannel(channelRef.current)
          .then(() => console.log(`Channel ${conversationId} cleaned up`))
          .catch((err) => console.error("Cleanup error:", err));
      }
    };

    // Create new channel
    const setupChannel = async () => {
      cleanup(); // Clean up any existing channel first

      const channel = supabase
        .channel(`messages:${conversationId}`, {
          config: {
            presence: { key: conversationId },
            broadcast: { ack: true },
          },
        })
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "messages",
            filter: `conversation_id=eq.${conversationId}`,
          },
          (payload) => {
            const newMessage = payload.new as SingleMessageType;
            queryClient.setQueryData<SingleMessageType[]>(
              ["messages", conversationId],
              (oldMessages = []) => {
                const exists = oldMessages.some((msg) => msg.id === newMessage.id);
                return exists ? oldMessages : [...oldMessages, newMessage];
              }
            );
          }
        )
        .subscribe((status, err) => {
          if (status === "SUBSCRIBED") {
            console.log(`Subscribed to ${conversationId}`);
          }
          if (err) {
            console.error("Subscription error:", err);
          }
        });

      channelRef.current = channel;
    };

    // Add delay to prevent rapid reconnection
    const timer = setTimeout(setupChannel, 300);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [conversationId, queryClient]);
}
