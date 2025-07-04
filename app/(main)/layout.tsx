import Navbar from "../_components/Navbar";
import AppLayout from "../_layouts/AppLayout";
import ClientProvider from "../_providers/ClientProvider";
import { ChildrenProps } from "../_types/childrenProps";

export default function MainLayout({ children }: ChildrenProps) {
  return (
    <ClientProvider>
      <section className="h-[100dvh] grid grid-cols-1 max-[640px]:grid-rows-[1fr_auto] sm:grid-cols-[auto_1fr]">
        <Navbar />

        <AppLayout>{children}</AppLayout>
      </section>
    </ClientProvider>
  );
}
