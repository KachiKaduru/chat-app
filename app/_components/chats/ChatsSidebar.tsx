"use client";

import { placeholderChatsArray } from "@/app/_data/chatsPlaceholderArray";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  className?: string;
}

export default function ChatsSidebar({ className }: Props) {
  const pathname = usePathname();
  const isBasePath = pathname === "/chats";

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
          <input type="search" className="w-full" placeholder="search here..." />
        </div>

        <div className="grid gap-1">
          {placeholderChatsArray.map((item) => (
            <Link
              className="p-2 rounded-lg bg-gray-600 block w-full"
              key={item.id}
              href={`/chats/${item.user_id}`}
            >
              <div>{item.name}</div>
            </Link>
          ))}
        </div>
      </main>
    </section>
  );
}
