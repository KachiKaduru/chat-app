import Navbar from "../_components/Navbar";
import TrackPath from "../_components/TrackPath";
import AppLayout from "../_layouts/AppLayout";
import { auth } from "../_lib/auth";
import ClientProvider from "../_providers/ClientProvider";
import { ChildrenProps } from "../_types/childrenProps";

export default async function MainLayout({ children }: ChildrenProps) {
  const session = await auth();

  return (
    <ClientProvider>
      <TrackPath />

      <section className="h-[100dvh] grid grid-cols-1 max-[640px]:grid-rows-[1fr_auto] sm:grid-cols-[auto_1fr]">
        <Navbar session={session} />

        <AppLayout>{children}</AppLayout>
      </section>
    </ClientProvider>
  );
}
