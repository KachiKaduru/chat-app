import { User } from "@/app/_types/users-type";
import Image from "next/image";
import { format } from "date-fns";

interface Props {
  children: React.ReactNode;
  sender: User;
  user: User;
  isGroup: boolean;
  timestamp?: string; // Added timestamp prop
  isRead?: boolean; // Added read status prop
}

export default function SingleMessage({
  children = "",
  sender,
  user,
  isGroup,
  timestamp,
  isRead = false,
}: Props) {
  const isUserMessage = sender.id === user.id;

  return (
    <div
      className={`w-fit max-w-[70dvw] sm:max-w-[60dvh] flex gap-1 ${
        isUserMessage ? "self-end flex-row" : "self-start flex-row-reverse"
      }`}
    >
      <div className={`flex flex-col gap-1 ${isUserMessage ? "items-end" : "items-start"}`}>
        <div
          className={`px-3 py-2 border rounded-2xl ${
            isUserMessage
              ? "bg-purple-700 text-white border-purple-700"
              : "bg-gray-200 border-none text-black"
          }`}
        >
          <p>{children}</p>
        </div>

        {/* Timestamp and read receipt */}
        <div className="flex items-center gap-1">
          {timestamp && (
            <span className="text-xs text-gray-500">{format(new Date(timestamp), "h:mm a")}</span>
          )}
          {isUserMessage && isRead && <span className="text-xs text-gray-500">✓✓</span>}
        </div>
      </div>

      {isGroup && (
        <div className="relative w-6 h-6 mt-auto mb-1">
          <Image
            src={isUserMessage ? user.image : sender.image}
            alt={isUserMessage ? user.name : sender.name}
            fill
            sizes="24px"
            className="rounded-[50%] border border-gray-300"
          />
        </div>
      )}
    </div>
  );
}
