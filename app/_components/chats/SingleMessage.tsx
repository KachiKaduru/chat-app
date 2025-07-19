import { User } from "@/app/_types/users-type";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
  sender: User;
  user: User;
  isGroup: boolean;
}

export default function SingleMessage({ children = "", sender, user, isGroup }: Props) {
  const isUserMessage = sender.id === user.id;

  return (
    <div
      className={` w-fit max-w-[70dvw] sm:max-w-[60dvh] flex gap-1 ${
        isUserMessage ? "self-end flex-row" : "self-start flex-row-reverse"
      }`}
    >
      <div
        className={`px-3 py-2 border border-[#ccc] rounded-2xl  ${
          isUserMessage ? "bg-purple-700 text-white" : "bg-gray-200 border-none text-black"
        }`}
      >
        <p>{children}</p>
      </div>

      {isGroup && (
        <div className="relative w-6 h-6 mt-auto mb-1">
          <Image
            src={isUserMessage ? user.image : sender.image}
            alt={isUserMessage ? user.name : sender.name}
            fill
            className="rounded-[50%] border border-gray-300"
          />
        </div>
      )}
    </div>
  );
}
