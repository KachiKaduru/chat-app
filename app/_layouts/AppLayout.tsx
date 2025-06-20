import LayoutContent from "../_components/_layouts/LayoutContent";
import LayoutSidebar from "../_components/_layouts/LayoutSidebar";

export default function AppLayout() {
  return (
    <section className="h-[91dvh] sm:h-[100dvh] grid grid-cols-1 sm:grid-cols-[auto_1fr] w-full">
      <LayoutSidebar />

      <LayoutContent />
    </section>
  );
}
