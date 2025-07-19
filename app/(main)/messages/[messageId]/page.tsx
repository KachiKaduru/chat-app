import { auth } from "@/app/_lib/auth";
import { getParticipants } from "@/app/_lib/actions/chat-actions";

import MessagesContent from "@/app/_components/chats/MessagesContent";
import SendMessage from "@/app/_components/chats/SendMessage";
import SingleChatHeader from "@/app/_components/chats/SingleChatHeader";
import { User } from "@/app/_types/users-type";

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

  const participants = await getParticipants(conversationId);

  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-3 h-[100dvh]">
      <SingleChatHeader conversationId={conversationId} />

      <MessagesContent
        conversationId={conversationId}
        participants={participants}
        user={user as User}
      />
      <SendMessage conversationId={conversationId} />
    </div>
  );
}
