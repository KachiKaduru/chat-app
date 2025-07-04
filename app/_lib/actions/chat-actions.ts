"use server";

import { auth } from "../auth";
import { supabase } from "../supabase";

//CONVERSATIONS
export async function getAllUserConversations() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return [];

  const { data, error } = await supabase.rpc("get_user_conversations", {
    p_user_id: userId,
  });

  if (error) {
    console.error("Error calling get_user_conversations:", error);
    return [];
  }

  return data;
}

export async function getConversation(friendId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId || !friendId) throw new Error("Missing user or friend ID");

  const { data: existingConversation, error: existingConversationError } = await supabase.rpc(
    "get_conversation_between_users",
    {
      user_a: userId,
      user_b: friendId,
    }
  );

  if (existingConversationError) {
    console.error(existingConversationError);
    throw new Error("Data could not be fetched");
  }

  if (existingConversation) return existingConversation;

  // Step 2: No conversation found — create one
  const { data: newConversation, error: newConversationError } = await supabase
    .from("conversations")
    .insert({
      created_by: userId,
      is_group: false,
    })
    .select()
    .single();

  if (newConversationError || !newConversation) {
    console.error("Error creating conversation:", newConversationError);
    throw new Error("Failed to create conversation");
  }

  const conversationId = newConversation.id;

  // Step 3: Add both participants to conversation_participants
  const { error: participantsError } = await supabase.from("conversation_participants").insert([
    {
      conversation_id: conversationId,
      user_id: userId,
    },
    {
      conversation_id: conversationId,
      user_id: friendId,
    },
  ]);

  if (participantsError) {
    console.error("Error adding participants:", participantsError);
    throw new Error("Failed to add participants");
  }

  return conversationId;
}

//PARTICIPANTS
export async function getParticipants(conversationId: string) {
  const { data: participants } = await supabase
    .from("conversation_participants")
    .select("user_id, users (*)")
    .eq("conversation_id", conversationId);

  return (participants || []).map((item) => item.users);
}

//MESSAGES
export async function getMessages(conversationID: string) {
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationID)
    .order("sent_at", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Data could not be fetched");
  }

  return messages;
}

export async function sendMessage(formData: FormData) {
  const content = formData.get("content")?.toString() || "";
  const conversationId = formData.get("conversation_id")?.toString();
  const session = await auth();
  const user = session?.user;

  if (!user || !content || !conversationId) return;

  await supabase.from("messages").insert({
    sender_id: user.id,
    conversation_id: conversationId,
    content,
    // sent_at: new Date().toISOString(),
  });
}
