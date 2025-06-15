import MessagesContent from "@/app/_components/chats/MessagesContent";
import { getConversation } from "@/app/_lib/actions/chat-actions";
import { getAllUsers } from "@/app/_lib/actions/user-actions";
import { auth } from "@/app/_lib/auth";

interface Props {
  params: {
    chatId: string;
  };
}

export default async function SingleChat({ params }: Props) {
  const { chatId } = await params;
  const { user } = (await auth())!;

  const users = await getAllUsers();
  const currentFriend = users.find((item) => item.id === chatId);
  // console.log(currentFriend);

  const conversationId = await getConversation(chatId);
  // console.log(conversation);

  const conversationDetails = {
    conversationId,
    userId: user?.id,
    friendId: chatId,
  };

  return (
    <div className="grid grid-rows-[auto_1fr] gap-5 h-full p-2">
      <header className="flex flex-col gap-5">
        <h2>Chats App</h2>
        {currentFriend && <h1>Single chat with {currentFriend.name}</h1>}
      </header>

      <section className="grid grid-rows-[1fr_auto]">
        <MessagesContent details={conversationDetails} />

        <form action="" className="w-full flex border-t pt-2">
          <input type="text" name="" className="w-full" placeholder="type here..." />
          <button className="w-fit px-4 py-1 border ">send</button>
        </form>
      </section>
    </div>
  );
}
