"use client";

import { usePathname } from "next/navigation";

export default function LayoutContent() {
  const pathname = usePathname();

  const isBasePath = pathname === "/chats";

  return (
    <section className={` overflow-auto ${!isBasePath ? "hidden" : ""} sm:block`}>
      <h1> The mainest content</h1>
    </section>
  );
}
