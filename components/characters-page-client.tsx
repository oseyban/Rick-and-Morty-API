"use client";

import type { FetchCharactersParams } from "@/lib/api/characters";
import { CharacterList } from "@/components/character-list";
import { Filters } from "@/components/filters";

interface CharactersPageClientProps {
  params: FetchCharactersParams;
}

export function CharactersPageClient({ params }: CharactersPageClientProps) {
  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6 md:p-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Rick and Morty Characters</h1>
        <p className="text-sm text-slate-600">
          Status: {params.status ?? "all"} | Gender: {params.gender ?? "all"} | Page:{" "}
          {params.page ?? 1}
        </p>
      </header>
      <Filters />
      <CharacterList params={params} />
    </main>
  );
}
