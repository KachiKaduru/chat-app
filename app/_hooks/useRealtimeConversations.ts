// hooks/useRealtimeConversations.ts
"use client";

import { useEffect, useRef } from "react";
import { supabase } from "../_lib/supabase";
import { ConversationType } from "../_types/conversation-types";
import { useQueryClient } from "@tanstack/react-query";

export function useRealtimeConversations(userId: string | null) {
  const queryClient = useQueryClient();
  const channelRef = useRef<ReturnType<typeof supabase.channel>>(null);

  useEffect(() => {
    if (!userId) return;

    // Clean up any existing channel
    const cleanup = () => {
      if (channelRef.current) {
        supabase
          .removeChannel(channelRef.current)
          .then(() => console.log(`Conversations channel cleaned up`))
          .catch((err) => console.error("Cleanup error:", err));
      }
    };

    // Create new channel
    const setupChannel = async () => {
      cleanup(); // Clean up any existing channel first

      const channel = supabase
        .channel(`conversations:user:${userId}`, {
          config: {
            presence: { key: userId },
            broadcast: { ack: true },
          },
        })
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "conversations",
            filter: `participants->>id=eq.${userId}`, // Adjust based on your participants structure
          },
          (payload) => {
            console.log("Conversation update:", payload);
            queryClient.setQueryData<ConversationType[]>(
              ["conversations"],
              (oldConversations = []) => {
                // Handle different event types
                switch (payload.eventType) {
                  case "INSERT":
                    return [payload.new as ConversationType, ...oldConversations];

                  case "UPDATE":
                    return oldConversations.map((conv) =>
                      conv.conversation_id === payload.new.conversation_id
                        ? { ...conv, ...payload.new }
                        : conv
                    );

                  case "DELETE":
                    return oldConversations.filter(
                      (conv) => conv.conversation_id !== payload.old.conversation_id
                    );

                  default:
                    return oldConversations;
                }
              }
            );
          }
        )
        .subscribe((status, err) => {
          if (status === "SUBSCRIBED") {
            console.log("Subscribed to conversations");
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
  }, [userId, queryClient]);
}
