"use client";

import useLayoutStore from "@/app/_store/useLayoutStore";
import { ChildrenProps } from "@/app/_types/childrenProps";

export default function LayoutContent({ children }: ChildrenProps) {
  const isBasePath = useLayoutStore((state) => state.isBasePath);

  return (
    <section className={`overflow-auto ${isBasePath ? "hidden" : "block"} sm:block`}>
      {children}
    </section>
  );
}
