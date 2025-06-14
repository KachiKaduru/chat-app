import Link from "next/link";
import { navArray } from "../_data/navigation";

export default function Navbar() {
  return (
    <nav className="p-4 row-start-2 row-end-3 sm:max-w-[150px] sm:row-span-full">
      <ul className="flex gap-4 justify-between sm:flex-col">
        {navArray.map((item) => (
          <Link key={item.id} href={item.link} className="flex gap-2">
            <item.icon className="w-6 h-6 text-blue-700" />
            <span>{item.title}</span>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
