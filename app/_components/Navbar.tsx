import Link from "next/link";
import { navArray } from "../_data/navigation";
import { auth } from "../_lib/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="p-6 row-start-2 row-end-3 sm:max-w-[150px] sm:row-span-full sm:flex sm:flex-col sm:justify-between">
      <ul className="flex gap-4 justify-between items-center sm:flex-col">
        {navArray.map((item) => (
          <Link key={item.id} href={item.link} className="flex gap-2">
            <item.icon className="w-6 h-6 text-black hover:text-purple-800" />
            {/* <span>{item.title}</span> */}
          </Link>
        ))}
      </ul>

      <div className="hidden sm:block">
        <img
          src={session?.user?.image}
          alt={session?.user?.name}
          className=" rounded-[50%] w-10 h-10"
          referrerPolicy="no-referrer"
        />
        <span className="mx-auto">{session?.user?.name?.split(" ", 1)}</span>
      </div>
    </nav>
  );
}
