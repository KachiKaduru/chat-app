"use client";

import { ChildrenProps } from "@/app/_types/childrenProps";
import { usePathname } from "next/navigation";

export default function LayoutContent({ children }: ChildrenProps) {
  const pathname = usePathname();

  return <section className={` overflow-auto hidden sm:block`}>{children}</section>;
}
