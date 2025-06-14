"use client";

import { usePathname } from "next/navigation";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function ChatContent({ className, children }: Props) {
  const pathname = usePathname();
  const isBasePath = pathname === "/chats";

  return (
    <main className={`${isBasePath ? "hidden" : ""} sm:block ${className}`}>
      <div>{children}</div>
    </main>
  );
}
