"use client";

import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getAllUsers } from "@/app/_lib/actions/user-actions";
import { getAllUserConversations } from "@/app/_lib/actions/chat-actions";
import useLayoutStore from "@/app/_store/useLayoutStore";

import LayoutSidebarHeader from "./LayoutSidebarHeader";
import { SidebarItem } from "@/app/_types/data-types";
import LayoutSidebarItem from "./LayoutSidebarItem";

export default function LayoutSidebar() {
  const pathname = usePathname();
  const isBasePath = useLayoutStore((state) => state.isBasePath);

  const isMessages = pathname.startsWith("/messages");
  const isFriends = pathname.startsWith("/friends");

  const { data: conversations, isLoading: loadingMessages } = useQuery({
    queryKey: ["conversations"],
    queryFn: getAllUserConversations,
    enabled: isMessages,
    staleTime: 1000 * 10, // 10s
    refetchOnMount: "always",
    refetchOnReconnect: true,
  });

  const { data: users, isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    enabled: isFriends,
    staleTime: 0,
  });

  const isLoading = loadingMessages || loadingUsers;

  let displayedData: SidebarItem[] = [];

  function getDisplayedData() {
    switch (true) {
      case isLoading:
        return [];
      case isMessages:
        return conversations;
      case isFriends:
        return users;
      default:
        return [];
    }
  }

  displayedData = getDisplayedData();

  return (
    <section
      className={`h-full ${
        isBasePath ? "block" : " hidden"
      } sm:block sm:w-[300px] overflow-auto bg-white text-black border-x-1 border-gray-200`}
    >
      <LayoutSidebarHeader pathname={pathname} />

      <main className="flex flex-col gap-4 overflow-auto p-4">
        {displayedData.map((item, index) => (
          <LayoutSidebarItem
            isFriends={isFriends}
            isMessages={isMessages}
            item={item}
            key={`no-${index + 1}`}
          />
        ))}
      </main>
    </section>
  );
}
