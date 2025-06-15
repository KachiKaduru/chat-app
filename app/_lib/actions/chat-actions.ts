"use server";

import { auth } from "../auth";
import { supabase } from "../supabase";

export async function getConversation(friendId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  const { data, error } = await supabase.rpc("get_conversation_between_users", {
    user_a: userId,
    user_b: friendId,
  });

  if (error) {
    console.error(error);
    throw new Error("Data could not be fetched");
  }

  return data;
}

export async function getMessages(conversationID: string) {
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationID);

  if (error) {
    console.error(error);
    throw new Error("Data could not be fetched");
  }

  return messages;
}
