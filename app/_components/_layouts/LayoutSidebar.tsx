import LayoutSidebarHeader from "./LayoutSidebarHeader";

export default function LayoutSidebar() {
  return (
    <section
      className={`overflow-auto bg-white text-black border-x-1 border-gray-200 h-[100dvh]  sm:block sm:w-[300px]`}
    >
      <LayoutSidebarHeader />

      <main className="flex flex-col gap-4 overflow-auto p-4"></main>
    </section>
  );
}
