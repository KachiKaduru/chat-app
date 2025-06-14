import { placeholderChatsArray } from "@/app/_data/chatsPlaceholderArray";

interface Props {
  params: {
    chatId: string;
  };
}

export default async function SingleChat({ params }: Props) {
  const { chatId } = await params;
  const currentFriend = placeholderChatsArray.find((item) => item.user_id === Number(chatId));

  return (
    <div className="flex flex-col gap-5">
      <header>Chats App</header>
      {currentFriend && <h1>Single chat of {currentFriend.name}</h1>}
    </div>
  );
}
