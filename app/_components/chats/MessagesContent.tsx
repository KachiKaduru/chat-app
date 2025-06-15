import { getMessages } from "@/app/_lib/actions/chat-actions";
import { getSingleUser } from "@/app/_lib/actions/user-actions";
import { auth } from "@/app/_lib/auth";
import { User } from "@/app/_types/users-type";

type Props = {
  details: {
    conversationId: string;
    userId: string | undefined;
    friendId: string;
  };
};

export default async function MessagesContent({ details }: Props) {
  const { conversationId, userId, friendId } = details;

  const [messages, user, friend] = await Promise.all([
    getMessages(conversationId),
    getSingleUser(userId),
    getSingleUser(friendId),
  ]);

  //   console.log(user);

  return (
    <section>
      <div className="flex flex-col gap-2">
        {messages.map((message) => (
          <SingleMessage sender_id={message.sender_id} key={message.id}>
            {message.content}
          </SingleMessage>
        ))}
      </div>
    </section>
  );
}

async function SingleMessage({ sender_id = "", children = "" }) {
  const sender: User = await getSingleUser(sender_id);
  const { user } = (await auth())!;
  const isUserMessage = sender_id === user?.id;

  return (
    <div
      className={`bg-green-400 p-2 border border-[#ccc] w-fit max-w-[40dvw] ${
        isUserMessage ? "self-end" : "self-start"
      }`}
    >
      <h2 className="font-semibold mb-2">{sender.name}</h2>
      <p>{children}</p>
    </div>
  );
}
