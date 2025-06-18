import ChatContent from "@/app/_components/chats/ChatContent";
import ChatsSidebar from "@/app/_components/chats/ChatsSidebar";
import { getAllUsers } from "@/app/_lib/actions/user-actions";
import { auth } from "@/app/_lib/auth";
import { ChildrenProps } from "@/app/_types/childrenProps";

export default async function ChatsLayout({ children }: ChildrenProps) {
  const users = await getAllUsers();
  const session = await auth();
  const user = session?.user;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-[auto_1fr] h-[91dvh] sm:h-[100dvh]">
      <ChatsSidebar users={users} user={user} />

      <ChatContent className={`overflow-auto bg-amber-50`}>{children}</ChatContent>
    </section>
  );
}
