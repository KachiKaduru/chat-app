import MessagesContent from "@/app/_components/chats/MessagesContent";
import SendMessage from "@/app/_components/chats/SendMessage";
import { getConversation, getMessages } from "@/app/_lib/actions/chat-actions";
import { getSingleUser } from "@/app/_lib/actions/user-actions";

interface Props {
  params: {
    chatId: string;
  };
}

export default async function SingleChat({ params }: Props) {
  const { chatId } = await params;
  const currentFriend = await getSingleUser(chatId);

  const conversationId = await getConversation(chatId);
  const messages = await getMessages(conversationId);

  return (
    <div className="grid grid-rows-[auto_1fr] gap-5 h-full p-2">
      <header className="flex flex-col gap-5">
        <h2>Chats App</h2>
        {currentFriend && <h1>Single chat with {currentFriend.name}</h1>}
      </header>

      <section className="grid grid-rows-[1fr_auto]">
        <MessagesContent messages={messages} />

        <SendMessage conversationId={conversationId} />
      </section>
    </div>
  );
}
