import { Messages, SingleMessageType } from "@/app/_types/message-types";
import SingleMessage from "./SingleMessage";

type Props = {
  messages: Messages;
};

export default async function MessagesContent({ messages }: Props) {
  return (
    <section>
      <div className="flex flex-col gap-2">
        {messages.map((message: SingleMessageType) => (
          <SingleMessage sender_id={message.sender_id} key={message.id}>
            {message.content}
          </SingleMessage>
        ))}
      </div>
    </section>
  );
}
