import Link from "next/link";
import { navArray } from "../_data/navigation";
import { auth } from "../_lib/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="p-4 row-start-2 row-end-3 sm:max-w-[150px] sm:row-span-full sm:flex sm:flex-col sm:justify-between">
      <ul className="flex gap-4 justify-between sm:flex-col">
        {navArray.map((item) => (
          <Link key={item.id} href={item.link} className="flex gap-2">
            <item.icon className="w-6 h-6 text-blue-700" />
            <span className="hidden sm:block">{item.title}</span>
          </Link>
        ))}
      </ul>

      <div className="hidden sm:block mb-20">
        <img
          src={session?.user?.image}
          alt={session?.user?.name}
          className="w-8 h-8 rounded-[50%]"
          referrerPolicy="no-referrer"
        />
        <span>{session?.user?.name?.split(" ", 1)}</span>
      </div>
    </nav>
  );
}
