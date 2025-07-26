"use client";

import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getAllUsers } from "@/app/_lib/actions/user-actions";
import { getAllUserConversations } from "@/app/_lib/actions/chat-actions";
import useLayoutStore from "@/app/_store/useLayoutStore";

import LayoutSidebarHeader from "./LayoutSidebarHeader";
import LayoutSidebarItem from "./LayoutSidebarItem";
import { useRealtimeConversations } from "@/app/_hooks/useRealtimeConversations";
import { SessionUser } from "@/app/_types/users-type";
import { SidebarItem } from "@/app/_types/data-types";

export default function LayoutSidebar({ user }: { user: SessionUser }) {
  const pathname = usePathname();
  const isBasePath = useLayoutStore((state) => state.isBasePath);

  const isMessages = pathname.startsWith("/messages");
  const isFriends = pathname.startsWith("/friends");

  // Add realtime updates
  const { data: conversations, isLoading: loadingConversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: getAllUserConversations,
    enabled: isMessages,
    staleTime: 0,
    // staleTime: 1000 * 60 * 5, // 5 minutes
    // refetchOnMount: false, // Changed from "always"
  });

  const { data: users, isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    enabled: isFriends,
    staleTime: 0,
  });

  // Enable realtime only after initial load
  useRealtimeConversations(loadingConversations ? null : user.id);

  const isLoading = loadingConversations || loadingUsers;
  const displayedData: SidebarItem[] = isLoading
    ? []
    : isMessages
    ? conversations
    : isFriends
    ? users
    : [];

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
            key={`number-${item.id}-${index}`} // Better key
          />
        ))}
      </main>
    </section>
  );
}
