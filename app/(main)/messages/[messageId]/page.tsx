import MessagesContent from "@/app/_components/chats/MessagesContent";
import SendMessage from "@/app/_components/chats/SendMessage";
import { getMessages, getParticipants } from "@/app/_lib/actions/chat-actions";
import { auth } from "@/app/_lib/auth";
// import SingleChatHeader from "@/app/_components/chats/SingleChatHeader";

interface Props {
  params: {
    messageId: string;
  };
}

export const revalidate = 0;

export default async function ConversationsPage({ params }: Props) {
  const session = await auth();
  const user = session?.user;

  const { messageId } = await params;

  const messages = (await getMessages(messageId)) ?? [];
  const participants = await getParticipants(messageId);

  return (
    <div className="grid grid-rows-[auto_1fr] gap-3 h-[100dvh]">
      {/* <SingleChatHeader friend={currentFriend} /> */}

      <section className="grid grid-rows-[1fr_auto] h-[85dvh] p-2">
        <MessagesContent
          messages={messages}
          conversationId={messageId}
          participants={participants}
          user={user}
        />

        <SendMessage conversationId={messageId} />
      </section>
    </div>
  );
}
