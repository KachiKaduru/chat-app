"use client";

import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChildrenProps } from "../_types/childrenProps";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      // staleTime: 1000 * 10,
    },
  },
});

type Props = ChildrenProps & {
  dehydratedState: unknown;
};

export default function ClientProvider({ children, dehydratedState }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
