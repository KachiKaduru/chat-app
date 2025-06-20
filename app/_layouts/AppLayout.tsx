import LayoutContent from "../_components/_layouts/LayoutContent";
import LayoutSidebar from "../_components/_layouts/LayoutSidebar";
import { ChildrenProps } from "../_types/childrenProps";

export default function AppLayout({ children }: ChildrenProps) {
  return (
    <section className="h-[91dvh] sm:h-[100dvh] grid grid-cols-1 sm:grid-cols-[auto_1fr] w-full overflow-auto">
      <LayoutSidebar />

      <LayoutContent>{children}</LayoutContent>
    </section>
  );
}
