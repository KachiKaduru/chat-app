"use client";

import { MagnifyingGlassIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

export default function LayoutSidebarHeader({ pathname = "" }) {
  const sidebarRoutes = [
    { prefix: "/calls", label: "Calls" },
    { prefix: "/chats", label: "Chats" },
    { prefix: "/messages", label: "Messages" },
    { prefix: "/friends", label: "Friends" },
    { prefix: "/settings", label: "Settings" },
  ];

  const matchedRoute = sidebarRoutes.find((route) => pathname.startsWith(route.prefix));
  const sidebarLabel = matchedRoute?.label ?? "Default Sidebar";

  return (
    <header className="">
      <div className="w-full p-4 border-b-1 border-gray-200 flex justify-between items-center">
        <h1 className="font-bold text-xl">{sidebarLabel}</h1>
        <PlusCircleIcon className="size-9 text-blue-700" />
      </div>

      <div className="p-4">
        <div className="w-full bg-[#f3f3f3] px-3 py-2 rounded-lg flex gap-2 items-center">
          <MagnifyingGlassIcon className="size-4 text-gray-700" />

          <input type="search" placeholder="search..." className="w-full text-sm" />
        </div>
      </div>
    </header>
  );
}
