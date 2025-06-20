"use client";

import { usePathname } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default function LayoutSidebar() {
  const pathname = usePathname();
  const isBasePath = pathname === "/chats";

  const getSidebarContent = (pathname: string) => {
    switch (pathname) {
      case "/calls":
        return <p>Calls</p>;
      case "/friends":
        return <p>Friends</p>;
      default:
        return <p>Default Sidebar</p>;
    }
  };

  return (
    <section
      className={`overflow-auto bg-white text-black border-x-1 border-gray-200 h-[100dvh] ${
        !isBasePath ? "w-full" : "hidden"
      } sm:block sm:w-[300px]`}
    >
      <header className="">
        <div className="w-full p-4 border-b-1 border-gray-200 flex justify-between items-center">
          <h1 className="font-bold pl-3 text-xl">{getSidebarContent(pathname)}</h1>
          <PlusCircleIcon className="size-9 text-blue-700" />
        </div>

        <div className="p-4">
          <div className="w-full bg-[#f3f3f3] px-3 py-2 rounded-lg flex gap-2 items-center">
            <MagnifyingGlassIcon className="size-4 text-gray-700" />

            <input type="search" placeholder="search..." className="w-full text-sm" />
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-4 overflow-auto p-4"></main>
    </section>
  );
}
