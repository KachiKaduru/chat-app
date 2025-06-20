"use client";

import { SessionUser, Users } from "@/app/_types/users-type";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  className?: string;
  users: Users;
  user: SessionUser | undefined;
}

export default function ChatsSidebar({ className, users, user }: Props) {
  const pathname = usePathname();
  const isBasePath = pathname === "/chats";

  const friends = users.filter((item) => item.id !== user?.id);

  return (
    <section
      className={`overflow-auto bg-white text-black border-x-1 border-gray-200 h-[100dvh] ${
        isBasePath ? "w-full" : "hidden"
      } sm:block sm:w-[300px] ${className} `}
    >
      <div className="">
        <header className="w-full p-4 border-b-1 border-gray-200 flex justify-between items-center">
          <h1 className="font-bold pl-3 text-xl">Chats</h1>
          <PlusCircleIcon className="size-9 text-blue-700" />
        </header>

        <main className="flex flex-col gap-4 overflow-auto p-4">
          <div className="w-full bg-[#f3f3f3] p-3 rounded-lg flex gap-2 items-center">
            <MagnifyingGlassIcon className="size-4 text-gray-700" />
            <input type="search" placeholder="search..." className="w-full text-sm" />
          </div>

          <section className="">
            {friends.map((item) => (
              <Link
                className="p-2 rounded-lg block w-full hover:bg-gray-200"
                key={item.id}
                href={`/chats/${item.id}`}
              >
                <div className="flex gap-4 relaative">
                  <img
                    src={item.image}
                    alt="user"
                    className="w-8 h-8 rounded-full border border-gray-300"
                  />
                  <h3 className="font-semibold">{item.name}</h3>
                </div>
              </Link>
            ))}
          </section>
        </main>
      </div>
    </section>
  );
}
