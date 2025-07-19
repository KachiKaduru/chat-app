import { auth } from "@/app/_lib/auth";
import { getConversation, getMessages, getParticipants } from "@/app/_lib/actions/chat-actions";
import { getSingleUser } from "@/app/_lib/actions/user-actions";

import MessagesContent from "@/app/_components/chats/MessagesContent";
import SendMessage from "@/app/_components/chats/SendMessage";
import SingleChatHeader from "@/app/_components/chats/SingleChatHeader";

interface Props {
  params: {
    friendId: string;
  };
}

export const revalidate = 0;

export default async function ConversationsPage({ params }: Props) {
  const session = await auth();
  const user = session?.user;

  const { friendId } = await params;
  const currentFriend = await getSingleUser(friendId);

  const conversationId = await getConversation(friendId);
  const messages = (await getMessages(conversationId)) ?? [];

  const participants = await getParticipants(conversationId);

  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-3 h-[100dvh]">
      <SingleChatHeader conversationId={conversationId} />

      <MessagesContent conversationId={conversationId} participants={participants} user={user} />

      <SendMessage conversationId={conversationId} />
    </div>
  );
}
