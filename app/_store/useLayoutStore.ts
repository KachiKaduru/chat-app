import { create } from "zustand";

type BasePath = "/messages" | "/friends" | "/calls" | "/settings" | "/chats" | "";

interface StoreState {
  pathname: string;
  basepath: BasePath;
  isBasePath: boolean;

  setPathname: (pathname: string) => void;
}

const useLayoutStore = create<StoreState>((set) => ({
  pathname: "",
  basepath: "",
  isBasePath: true,

  setPathname: (pathname) =>
    set(() => {
      const segments = pathname.split("/").filter(Boolean); // removes empty strings
      const base = ("/" + (segments[0] || "")) as BasePath;
      const isBasePath = segments.length === 1;

      return {
        pathname,
        basepath: base,
        isBasePath,
      };
    }),
}));

export default useLayoutStore;
