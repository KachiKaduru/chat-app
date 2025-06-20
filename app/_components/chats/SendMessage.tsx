import { sendMessage } from "@/app/_lib/actions/chat-actions";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { PaperClipIcon } from "@heroicons/react/24/outline";

export default function SendMessage({ conversationId = "" }) {
  return (
    <div className="w-full flex border-t pt-2 outline-purple-400 items-center px-2 gap-4">
      <PaperClipIcon className="size-5" />

      <form
        action={sendMessage}
        className="border-1 rounded-md border-gray-400 p-3 w-full flex justify-between items-center"
      >
        <input type="text" name="content" placeholder="Type a message" className="w-full" />
        <input type="hidden" name="conversation_id" value={conversationId} />

        <button className="w-fit px-4 py-1 cursor-pointer">
          <PaperAirplaneIcon className="size-5 text-purple-800" />
        </button>
      </form>
    </div>
  );
}
