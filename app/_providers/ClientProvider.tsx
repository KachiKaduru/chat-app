"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChildrenProps } from "../_types/childrenProps";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      // staleTime: 60*100
    },
  },
});

export default function ClientProvider({ children }: ChildrenProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
}
