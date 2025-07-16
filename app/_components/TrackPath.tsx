"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import useLayoutStore from "../_store/useLayoutStore";

export default function TrackPath() {
  const pathname = usePathname();
  const setPathname = useLayoutStore((state) => state.setPathname);

  useEffect(() => {
    if (pathname) {
      setPathname(pathname);
    }
  }, [pathname, setPathname]);

  return null;
}
