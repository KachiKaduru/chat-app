import { sendMessage } from "@/app/_lib/actions/chat-actions";

export default function SendMessage({ conversationId = "" }) {
  return (
    <form action={sendMessage} className="w-full flex border-t pt-2">
      <input type="text" name="content" className="w-full" placeholder="type here..." />
      <input type="hidden" name="conversation_id" value={conversationId} />
      <button className="w-fit px-4 py-1 border ">send</button>
    </form>
  );
}
