"use client";

import { ChildrenProps } from "@/app/_types/childrenProps";
import { usePathname } from "next/navigation";

export default function LayoutContent({ children }: ChildrenProps) {
  const pathname = usePathname();

  const isBasePath = pathname === "/chats";

  return (
    <section className={` overflow-auto ${!isBasePath ? "hidden" : ""} sm:block`}>
      <h1> The mainest content</h1>

      <div>{children}</div>
    </section>
  );
}
