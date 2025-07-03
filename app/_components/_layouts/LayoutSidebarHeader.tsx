"use client";

import { MagnifyingGlassIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";

export default function LayoutSidebarHeader() {
  const pathname = usePathname();

  //   const isBasePath = pathname === "/chats";

  const getSidebarContent = (pathname: string) => {
    switch (pathname) {
      case "/calls":
        return <p>Calls</p>;
      case "/chats":
        return <p>Chats</p>;
      case "/messages":
        return <p>Messages</p>;
      case "/friends":
        return <p>Friends</p>;
      case "/settings":
        return <p>Settings</p>;
      default:
        return <p>Default Sidebar</p>;
    }
  };
  return (
    <header className="">
      <div className="w-full p-4 border-b-1 border-gray-200 flex justify-between items-center">
        <h1 className="font-bold text-xl">{getSidebarContent(pathname)}</h1>
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
