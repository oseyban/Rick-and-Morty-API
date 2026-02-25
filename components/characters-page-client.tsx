"use client";

import { HydrationBoundary, type DehydratedState } from "@tanstack/react-query";

import { useCharacters } from "@/hooks/use-characters";
import type { FetchCharactersParams } from "@/lib/api/characters";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CharactersPageClientProps {
  dehydratedState: DehydratedState;
  params: FetchCharactersParams;
}

function CharactersList({ params }: { params: FetchCharactersParams }) {
  const charactersQuery = useCharacters(params);

  if (charactersQuery.isError) {
    return (
      <Card>
        <CardContent className="pt-6 text-sm text-red-600">
          {charactersQuery.error.message}
        </CardContent>
      </Card>
    );
  }

  if (!charactersQuery.data) {
    return (
      <Card>
        <CardContent className="pt-6 text-sm text-slate-600">Loading...</CardContent>
      </Card>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {charactersQuery.data.results.map((character) => (
        <Card key={character.id}>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">{character.name}</CardTitle>
            <Badge variant="secondary">{character.status}</Badge>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-slate-600">
            <p>Gender: {character.gender}</p>
            <p>Species: {character.species}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

export function CharactersPageClient({ dehydratedState, params }: CharactersPageClientProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <main className="mx-auto max-w-5xl space-y-6 p-6 md:p-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Rick and Morty Characters</h1>
          <p className="text-sm text-slate-600">
            Status: {params.status ?? "all"} | Gender: {params.gender ?? "all"} | Page:{" "}
            {params.page ?? 1}
          </p>
        </header>
        <CharactersList params={params} />
      </main>
    </HydrationBoundary>
  );
}
