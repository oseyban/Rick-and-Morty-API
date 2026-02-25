"use client";

import {
  HydrationBoundary,
  QueryClientProvider,
  type DehydratedState,
} from "@tanstack/react-query";
import { useState } from "react";

import { createQueryClient } from "@/lib/react-query/query-client";

interface QueryProviderProps {
  children: React.ReactNode;
  dehydratedState: DehydratedState;
}

export function QueryProvider({ children, dehydratedState }: QueryProviderProps) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
