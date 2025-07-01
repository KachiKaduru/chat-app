"use server";

import { auth } from "../auth";
import { supabase } from "../supabase";

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

export async function getParticipants(conversationId: string) {
  const { data: participants } = await supabase
    .from("conversation_participants")
    .select("user_id, users (*)")
    .eq("conversation_id", conversationId);

  return (participants || []).map((item) => item.users);
}

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

//VERSION ONE
// export async function getAllUserConversations() {
//   const session = await auth();
//   const userId = session?.user?.id;

//   if (!userId) return [];

//   // Step 1: Get all conversations user is part of
//   const { data: participantRows, error } = await supabase
//     .from("conversation_participants")
//     .select(
//       `
//       conversation_id,
//       conversations (
//         id,
//         is_group,
//         group_name,
//         created_by
//       )
//     `
//     )
//     .eq("user_id", userId);

//   if (error) {
//     console.error("Failed to fetch conversations:", error);
//     return [];
//   }

//   // Step 2: Enrich each conversation
//   const enriched = await Promise.all(
//     participantRows.map(async (row) => {
//       const conv: ConversationType = row.conversations;

//       let display_name = conv.group_name || "Unnamed Group";
//       let image = "";

//       if (!conv.is_group) {
//         // Get the other user
//         const { data: others } = await supabase
//           .from("conversation_participants")
//           .select("user_id, users(name, image)")
//           .eq("conversation_id", conv.id)
//           .neq("user_id", userId)
//           .limit(1);

//         const otherUser = others?.[0]?.users;
//         display_name = otherUser?.name || "Unknown";
//         image = otherUser?.image || "";
//       }

//       // Get latest message for this conversation
//       const { data: lastMsg, error: lastMsgErr } = await supabase
//         .from("messages")
//         .select("content, sent_at")
//         .eq("conversation_id", conv.id)
//         .order("sent_at", { ascending: false })
//         .limit(1)
//         .single();

//       return {
//         id: conv.id,
//         is_group: conv.is_group,
//         display_name,
//         image,
//         last_message: lastMsg?.content || null,
//         last_sent_at: lastMsg?.sent_at || null,
//       };
//     })
//   );

//   // Step 3: Sort by latest sent_at
//   return enriched.sort((a, b) => {
//     const dateA = a.last_sent_at ? new Date(a.last_sent_at).getTime() : 0;
//     const dateB = b.last_sent_at ? new Date(b.last_sent_at).getTime() : 0;
//     return dateB - dateA;
//   });
// }

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
