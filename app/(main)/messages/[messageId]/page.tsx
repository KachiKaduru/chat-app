import MessagesContent from "@/app/_components/chats/MessagesContent";
import SendMessage from "@/app/_components/chats/SendMessage";
import { getParticipants } from "@/app/_lib/actions/chat-actions";
import { auth } from "@/app/_lib/auth";
import SingleChatHeader from "@/app/_components/chats/SingleChatHeader";

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
    <div className="grid grid-rows-[auto_1fr] gap-3 h-[100dvh]">
      <SingleChatHeader conversationId={conversationId} />

      <section className="grid grid-rows-[1fr_auto] h-[85dvh] p-2">
        <MessagesContent conversationId={conversationId} participants={participants} user={user} />

        <SendMessage conversationId={conversationId} />
      </section>
    </div>
  );
}
