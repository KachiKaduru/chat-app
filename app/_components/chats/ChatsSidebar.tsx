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
  console.log(user);

  return (
    <section
      className={`overflow-auto bg-white text-black h-[100dvh] ${
        isBasePath ? "w-full" : "hidden"
      } sm:block sm:w-[300px] ${className} `}
    >
      <div className="px-5">
        <header className="mb-3 w-full h-16 border-b-black flex justify-between items-center">
          <h1 className="font-bold pl-3 text-xl">Messages &darr;</h1>
          {/* <button className="font-bold rounded-full p-3 w-8 h-8 bg-purple-600 grid items-center">
            +
          </button> */}
          <PlusCircleIcon className="size-9 text-purple-800" />
        </header>

        <main className="flex flex-col gap-4 overflow-auto">
          <div className="w-full bg-[#f3f3f3] p-3 rounded-lg flex gap-2 items-center">
            <MagnifyingGlassIcon className="size-4 text-gray-700" />
            <input
              type="search"
              placeholder="Search messages"
              className="pl-3"
            />
          </div>

          <div className="grid">
            {friends.map((item) => (
              <Link
                className="p-2 rounded-lg block w-full h-18 hover:bg-[#718096]"
                key={item.id}
                href={`/chats/${item.id}`}
              >
                <div className="flex gap-5">
                  <div className="w-12 h-12">
                    <img src={item.image} alt="user" className="rounded-md" />
                  </div>
                  <div className="font-semibold">{item.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </section>
  );
}
