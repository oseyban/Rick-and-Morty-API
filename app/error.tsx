"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/error-state";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Useful for debugging errors surfaced by the app router.
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-5xl space-y-4 p-6 md:p-10">
      <ErrorState message={error.message || "Something went wrong."} />
      <Button type="button" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
