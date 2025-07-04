import { SidebarItem } from "@/app/_types/data-types";
import Image from "next/image";

export default function SingleChatHeader({ friend }: { friend: SidebarItem }) {
  //   console.log(friend);

  return (
    <header className="p-4 border-b-1 border-gray-300 flex gap-3 items-center">
      <div className="relative w-9 h-9 ">
        <Image
          src={friend.image}
          alt={`${friend.name || friend.display_name}`}
          fill
          className="object-cover rounded-[50%]"
        />
      </div>
      <h1 className="text-xl font-semibold">{friend.name || friend.display_name}</h1>
    </header>
  );
}
