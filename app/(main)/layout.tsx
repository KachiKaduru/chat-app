import { dehydrate, QueryClient } from "@tanstack/react-query";
import { auth } from "../_lib/auth";
import { getAllUserConversations } from "../_lib/actions/chat-actions";
import { ChildrenProps } from "../_types/childrenProps";

import ClientProvider from "../_providers/ClientProvider";
import AppLayout from "../_layouts/AppLayout";
import Navbar from "../_components/Navbar";
import TrackPath from "../_components/TrackPath";
import { Session } from "../_types/users-type";

export default async function MainLayout({ children }: ChildrenProps) {
  const session = await auth();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["conversations"],
    queryFn: getAllUserConversations,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <ClientProvider dehydratedState={dehydratedState}>
      <TrackPath />

      <section className="h-[100dvh] grid grid-cols-1 max-[640px]:grid-rows-[1fr_auto] sm:grid-cols-[auto_1fr]">
        <Navbar session={session as Session} />

        <AppLayout>{children}</AppLayout>
      </section>
    </ClientProvider>
  );
}
