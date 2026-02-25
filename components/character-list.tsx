"use client";

import { useCharacters } from "@/hooks/use-characters";
import type { FetchCharactersParams } from "@/lib/api/characters";
import { CharacterCard } from "@/components/character-card";
import { CharacterListLoading } from "@/components/character-list-loading";
import { ErrorState } from "@/components/error-state";
import { Pagination } from "@/components/pagination";
import { Card, CardContent } from "@/components/ui/card";

interface CharacterListProps {
  params: FetchCharactersParams;
}

export function CharacterList({ params }: CharacterListProps) {
  const charactersQuery = useCharacters(params);

  if (charactersQuery.isLoading) {
    return <CharacterListLoading />;
  }

  if (charactersQuery.isError) {
    return <ErrorState message={charactersQuery.error.message} />;
  }

  if (!charactersQuery.data || charactersQuery.data.results.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-sm text-slate-600">No characters found.</CardContent>
      </Card>
    );
  }

  return (
    <section>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {charactersQuery.data.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <Pagination totalPages={charactersQuery.data.info.pages} />
    </section>
  );
}
