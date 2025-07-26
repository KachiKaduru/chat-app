import { create } from "zustand";

type BasePath = "/messages" | "/friends" | "/calls" | "/settings" | "/chats" | "";

const basePaths: BasePath[] = ["/messages", "/friends", "/calls", "/settings", "/chats", ""];

interface StoreState {
  pathname: string | null;
  basepath: BasePath;
  isBasePath: boolean;
  setPathname: (pathname: string) => void;
}

const useLayoutStore = create<StoreState>((set) => {
  const pathname = "";
  const segments = pathname.split("/").filter(Boolean);
  const base = ("/" + (segments[0] || "")) as BasePath;
  const isBasePath = basePaths.includes(pathname as BasePath);

  return {
    pathname,
    basepath: base,
    isBasePath,

    setPathname: (newPathname) => {
      const newSegments = newPathname.split("/").filter(Boolean);
      const newBase = ("/" + (newSegments[0] || "")) as BasePath;
      const isBase = basePaths.includes(newPathname as BasePath);

      set({
        pathname: newPathname,
        basepath: newBase,
        isBasePath: isBase,
      });
    },
  };
});

export default useLayoutStore;
