import { auth } from "@/app/_lib/auth";
import { getAllUserConversations, getParticipants } from "@/app/_lib/actions/chat-actions";

import MessagesContent from "@/app/_components/messages/MessagesContent";
import SendMessage from "@/app/_components/messages/SendMessage";
import SingleChatHeader from "@/app/_components/messages/SingleChatHeader";
import { User } from "@/app/_types/users-type";
import { ConversationType } from "@/app/_types/conversation-types";

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

  const [participants, conversations] = await Promise.all([
    getParticipants(conversationId),
    getAllUserConversations(),
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
