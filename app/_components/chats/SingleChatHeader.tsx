"use client";

import { SidebarItem } from "@/app/_types/data-types";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import BackButton from "../BackButton";

export default function SingleChatHeader({ conversationId }: { conversationId: string }) {
  const queryClient = useQueryClient();
  const conversations = (queryClient.getQueryData(["conversations"]) ?? []) as SidebarItem[];

  const friend = conversations.find((item) => item.conversation_id === conversationId);

  return (
    <header className="p-4 border-b-1 border-gray-300 flex gap-3 items-center sticky top-0 bg-white z-20">
      <BackButton />
      <div className="relative w-9 h-9 border border-gray-300 rounded-[50%] grid place-content-center">
        {friend?.image ? (
          <Image
            src={friend?.image}
            alt={`${friend?.name || friend?.display_name}`}
            fill
            sizes="36px"
            className="object-cover rounded-[50%]"
          />
        ) : (
          <UserGroupIcon className="text-gray-600 w-7 h-7" />
        )}
      </div>
      <h1 className="text-xl font-semibold">{friend?.name || friend?.display_name}</h1>
    </header>
  );
}
