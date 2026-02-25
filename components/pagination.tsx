"use client";

import { parseAsInteger, useQueryState } from "nuqs";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  totalPages: number;
}

export function Pagination({ totalPages }: PaginationProps) {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const currentPage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <Button
        type="button"
        variant="outline"
        disabled={currentPage <= 1}
        onClick={() => setPage(Math.max(1, currentPage - 1), { shallow: false })}
      >
        Prev
      </Button>
      <Badge variant="secondary">
        Page {currentPage} / {Math.max(totalPages, 1)}
      </Badge>
      <Button
        type="button"
        variant="outline"
        disabled={currentPage >= totalPages}
        onClick={() => setPage(Math.min(totalPages, currentPage + 1), { shallow: false })}
      >
        Next
      </Button>
    </div>
  );
}
