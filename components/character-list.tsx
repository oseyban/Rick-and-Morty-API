"use client";

import { useCharacters } from "@/hooks/use-characters";
import type { FetchCharactersParams } from "@/lib/api/characters";
import { CharacterCard } from "@/components/character-card";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CharacterListProps {
  params: FetchCharactersParams;
}

export function CharacterList({ params }: CharacterListProps) {
  const charactersQuery = useCharacters(params);

  if (charactersQuery.isLoading) {
    return (
      <section className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="space-y-3 p-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </section>
    );
  }

  if (charactersQuery.isError) {
    return (
      <Card>
        <CardContent className="pt-6 text-sm text-red-600">{charactersQuery.error.message}</CardContent>
      </Card>
    );
  }

  if (!charactersQuery.data || charactersQuery.data.results.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-sm text-slate-600">No characters found.</CardContent>
      </Card>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {charactersQuery.data.results.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </section>
  );
}
