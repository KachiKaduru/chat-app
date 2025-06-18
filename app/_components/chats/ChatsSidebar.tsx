"use client";

import { SessionUser, Users } from "@/app/_types/users-type";
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
      className={`overflow-auto bg-[#343A40] text-white h-[100dvh] ${
        isBasePath ? "w-full" : "hidden"
      } sm:block sm:w-[300px] ${className} `}
    >
      <header className="mt-3 w-full grid items-center justify-center">
        <h1 className="font-bold text-[#007bff] pl-5 pb-4 text-2xl">
          &darr; Messages
        </h1>
      </header>

      <main className="flex flex-col gap-4 overflow-auto">
        <div>
          <input
            type="search"
            className="w-full bg-[#333333] p-1"
            placeholder="search here..."
          />
        </div>

        <div className="grid">
          {friends.map((item) => (
            <Link
              className="p-2 bg-[#001F3F] block w-full"
              key={item.id}
              href={`/chats/${item.id}`}
            >
              <div>{item.name}</div>
            </Link>
          ))}
        </div>
      </main>
    </section>
  );
}
