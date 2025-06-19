import Link from "next/link";
import { navArray } from "../_data/navigation";
import { auth } from "../_lib/auth";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export default async function Navbar() {
  const session = await auth();
  // console.log(session?.user);

  return (
    <nav className="p-6  sm:max-w-[150px] border-r-1 border-gray-300 sm:row-span-full sm:flex sm:flex-col sm:justify-between">
      <div className="hidden sm:block">
        <img
          src={session?.user?.image}
          alt={session?.user?.name}
          className="w-12 h-12 rounded-lg"
          referrerPolicy="no-referrer"
        />
        <span className="mx-auto">{session?.user?.name?.split(" ", 1)}</span>
      </div>

      <ul className="flex gap-4 justify-between items-center sm:flex-col">
        {navArray.map((item) => (
          <Link key={item.id} href={item.link} className="flex gap-2">
            <item.icon className="w-6 h-6 text-black hover:text-purple-800" />
            {/* <span>{item.title}</span> */}
          </Link>
        ))}
      </ul>

      <Link href={"/settings"}>
        <Cog6ToothIcon className="size-9" />
      </Link>
    </nav>
  );
}
