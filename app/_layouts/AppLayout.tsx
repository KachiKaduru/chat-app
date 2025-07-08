import LayoutContent from "../_components/_layouts/LayoutContent";
import LayoutSidebar from "../_components/_layouts/LayoutSidebar";
import { Params } from "../_types/params";

export const revalidate = 0;

interface Props {
  params: Params;
  children: React.ReactNode;
}

export default async function AppLayout({ children }: Props) {
  return (
    <section className="min-w-[320px] h-[91dvh] sm:h-[100dvh] grid grid-cols-1 sm:grid-cols-[auto_1fr] w-full overflow-auto">
      <LayoutSidebar />

      <LayoutContent>{children}</LayoutContent>
    </section>
  );
}
