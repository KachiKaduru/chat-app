import ChatContent from "@/app/_components/chats/ChatContent";
import ChatsSidebar from "@/app/_components/chats/ChatsSidebar";
import { ChildrenProps } from "@/app/_types/childrenProps";

export default function ChatsLayout({ children }: ChildrenProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-[auto_1fr] h-[100dvh]">
      <ChatsSidebar />

      <ChatContent className={`overflow-auto`}>{children}</ChatContent>
    </section>
  );
}
