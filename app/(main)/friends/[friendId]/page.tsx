import MessagesContent from "@/app/_components/chats/MessagesContent";
import SendMessage from "@/app/_components/chats/SendMessage";
import SingleChatHeader from "@/app/_components/chats/SingleChatHeader";
import { getConversation, getMessages, getParticipants } from "@/app/_lib/actions/chat-actions";
import { getSingleUser } from "@/app/_lib/actions/user-actions";
import { auth } from "@/app/_lib/auth";

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
    <div className="grid grid-rows-[auto_1fr] gap-3 h-[100dvh]">
      <SingleChatHeader friend={currentFriend} />

      <section className="grid grid-rows-[1fr_auto] h-[85dvh] p-2">
        <MessagesContent
          messages={messages}
          conversationId={conversationId}
          participants={participants}
          user={user}
        />

        <SendMessage conversationId={conversationId} />
      </section>
    </div>
  );
}
