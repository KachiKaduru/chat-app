import { auth } from "@/app/_lib/auth";
import {
  getAllUserConversations,
  getMessages,
  getParticipants,
} from "@/app/_lib/actions/chat-actions";

import MessagesContent from "@/app/_components/messages/MessagesContent";
import SendMessage from "@/app/_components/messages/SendMessage";
import SingleChatHeader from "@/app/_components/messages/SingleChatHeader";
import { User } from "@/app/_types/users-type";
import { ConversationType } from "@/app/_types/conversation-types";
import { QueryClient } from "@tanstack/react-query";

interface Props {
  params: {
    messageId: string;
  };
}

export const revalidate = 0;

export default async function ConversationsPage({ params }: Props) {
  const session = await auth();
  const user = session?.user;
  const { messageId: conversationId } = await params;

  // Create query client for server-side prefetching
  const queryClient = new QueryClient();

  // Prefetch both conversations and messages
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["conversations"],
      queryFn: getAllUserConversations,
    }),
    queryClient.prefetchQuery({
      queryKey: ["messages", conversationId],
      queryFn: () => getMessages(conversationId),
    }),
  ]);

  // Get participants and conversations in parallel
  const [participants, conversations] = await Promise.all([
    getParticipants(conversationId),
    getAllUserConversations(), // This will come from cache due to prefetch
  ]);

  const isGroup =
    conversations.find((item: ConversationType) => item?.conversation_id === conversationId)
      .is_group === true;

  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-3 h-[100dvh]">
      <SingleChatHeader conversationId={conversationId} />

      <MessagesContent
        conversationId={conversationId}
        participants={participants}
        user={user as User}
        isGroup={isGroup}
      />
      <SendMessage conversationId={conversationId} />
    </div>
  );
}
