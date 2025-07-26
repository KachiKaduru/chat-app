import LayoutContent from "../_components/_layouts/LayoutContent";
import LayoutSidebar from "../_components/_layouts/LayoutSidebar";
import { ChildrenProps } from "../_types/childrenProps";
import { SessionUser } from "../_types/users-type";
import { getSession } from "../_utils/getSession";

export const revalidate = 0;

export default async function AppLayout({ children }: ChildrenProps) {
  const session = await getSession();

  return (
    <section className="min-w-[320px] sm:h-[100dvh] grid grid-cols-1 sm:grid-cols-[auto_1fr] w-full overflow-auto">
      <LayoutSidebar user={session.user as SessionUser} />

      <LayoutContent>{children}</LayoutContent>
    </section>
  );
}
