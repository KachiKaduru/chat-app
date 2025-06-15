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
      className={`overflow-auto h-[100dvh] ${
        isBasePath ? "w-full" : "hidden"
      } sm:block sm:w-[300px] ${className} `}
    >
      <header>
        <h1>Chats Page</h1>
      </header>

      <main className="flex flex-col gap-4 overflow-auto">
        <div>
          <input type="search" className="w-full bg-white" placeholder="search here..." />
        </div>

        <div className="grid gap-1">
          {friends.map((item) => (
            <Link
              className="p-2 rounded-lg bg-gray-600 block w-full"
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
