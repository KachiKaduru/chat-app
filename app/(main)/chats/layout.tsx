import ChatContent from "@/app/_components/chats/ChatContent";
import ChatsSidebar from "@/app/_components/chats/ChatsSidebar";
// import { getAllUserConversations } from "@/app/_lib/actions/chat-actions";
import { getAllUsers } from "@/app/_lib/actions/user-actions";
import { auth } from "@/app/_lib/auth";
import { ChildrenProps } from "@/app/_types/childrenProps";

export default async function ChatsLayout({ children }: ChildrenProps) {
  const users = await getAllUsers();
  const session = await auth();
  const user = session?.user;

  // const conversations = await getAllUserConversations();
  // console.log(conversations);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-[auto_1fr] h-[91dvh] sm:h-[100dvh]">
      <ChatsSidebar users={users} user={user} />

      <ChatContent className={`overflow-auto`}>{children}</ChatContent>
    </section>
  );
}
