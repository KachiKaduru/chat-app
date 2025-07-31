"use client";

import { useEffect, useRef } from "react";
import { supabase } from "../_lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";

export function useRealtimeConversations(userId: string | null) {
  const queryClient = useQueryClient();
  const channelRef = useRef<ReturnType<typeof supabase.channel>>(null);

  const { run: debouncedRefetch, cancel: cancelDebounce } = useDebounce(
    () => {
      console.log("🔄 Refetching conversations due to realtime event...");
      queryClient.refetchQueries({ queryKey: ["conversations"] });
    },
    1000,
    { leading: true, trailing: false }
  );

  useEffect(() => {
    if (!userId) return;

    const cleanup = () => {
      if (channelRef.current) {
        supabase
          .removeChannel(channelRef.current)
          .then(() => console.log("🧹 Cleaned up conversations channel"))
          .catch((err) => console.error("❌ Cleanup error:", err));
      }
    };

    const setupChannel = () => {
      cleanup();

      const channel = supabase
        .channel(`realtime:messages-for-${userId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
          },
          async (payload) => {
            const newMessage = payload.new;
            const { conversation_id } = newMessage;

            // Query the conversation_participants table
            const { data, error } = await supabase
              .from("conversation_participants")
              .select("user_id")
              .eq("conversation_id", conversation_id)
              .eq("user_id", userId)
              .single();

            if (error) {
              if (error.code !== "PGRST116") {
                console.error("🔍 Error checking participant:", error.message);
              }
              return;
            }

            if (data) {
              // If current user is a participant in the conversation
              debouncedRefetch();
            }
          }
        )
        .subscribe((status, err) => {
          if (status === "SUBSCRIBED") {
            console.log(`✅ Subscribed to messages for user: ${userId}`);
          }
          if (err) {
            console.error("❌ Subscription error:", err);
          }
        });

      channelRef.current = channel;
    };

    const timer = setTimeout(setupChannel, 300);

    return () => {
      clearTimeout(timer);
      cleanup();
      cancelDebounce();
    };
  }, [userId, debouncedRefetch, cancelDebounce, queryClient]);
}
