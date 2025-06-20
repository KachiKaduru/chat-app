import { User } from "@/app/_types/users-type";
import Image from "next/image";

export default function SingleChatHeader({ friend }: { friend: User }) {
  //   console.log(friend);

  return (
    <header className="p-4 border-b-1 border-gray-300 flex gap-3 items-center">
      <div className="relative w-9 h-9 ">
        <Image src={friend.image} alt={friend.name} fill className="object-cover rounded-[50%]" />
      </div>
      <h1 className="text-xl font-semibold">{friend.name}</h1>
    </header>
  );
}
