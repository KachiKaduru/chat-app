"use client";

import Link from "next/link";
import { navArray } from "../_data/navigation";
import useLayoutStore from "../_store/useLayoutStore";
import Image from "next/image";
import { Session } from "../_types/users-type";

export default function Navbar({ session }: { session: Session }) {
  const isBasePath = useLayoutStore((state) => state.isBasePath);

  return (
    <nav
      className={`bg-white/50 backdrop-blur-xs p-6 row-start-2 row-end-3 sm:max-w-[150px] ${
        isBasePath ? "block" : "hidden"
      } sm:row-span-full sm:flex sm:flex-col sm:gap-4`}
    >
      <header className="hidden sm:block">
        <h1>Chat App</h1>
      </header>

      <ul className="flex gap-4 justify-between items-center sm:flex-col">
        {navArray.map((item) => (
          <Link key={item.id} href={item.link} className="flex gap-2">
            <item.icon className="w-6 h-6 text-indigo-700" />
          </Link>
        ))}
      </ul>

      <div className="hidden sm:block sm:self-center sm:justify-self-end">
        <div className="relative w-10 h-10 ">
          <Image
            src={session?.user?.image}
            alt={session?.user?.name}
            fill
            sizes="40px"
            className=" object-cover rounded-[50%]"
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="mx-auto">{session?.user?.name?.split(" ", 1)}</span>
      </div>
    </nav>
  );
}
