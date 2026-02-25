import { dehydrate } from "@tanstack/react-query";

import { CharactersPageClient } from "@/components/characters-page-client";
import { charactersQueryKey } from "@/hooks/use-characters";
import { fetchCharacters, type FetchCharactersParams } from "@/lib/api/characters";
import { createQueryClient } from "@/lib/react-query/query-client";
import type { CharacterGender, CharacterStatus } from "@/types/character";

interface HomePageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const STATUS_VALUES: CharacterStatus[] = ["alive", "dead", "unknown"];
const GENDER_VALUES: CharacterGender[] = ["female", "male", "genderless", "unknown"];

function pickFirstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseStatus(value: string | undefined): CharacterStatus | undefined {
  if (!value) {
    return undefined;
  }

  return STATUS_VALUES.find((status) => status === value);
}

function parseGender(value: string | undefined): CharacterGender | undefined {
  if (!value) {
    return undefined;
  }

  return GENDER_VALUES.find((gender) => gender === value);
}

function parsePage(value: string | undefined): number {
  if (!value) {
    return 1;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};

  const queryParams: FetchCharactersParams = {
    status: parseStatus(pickFirstValue(resolvedSearchParams.status)),
    gender: parseGender(pickFirstValue(resolvedSearchParams.gender)),
    page: parsePage(pickFirstValue(resolvedSearchParams.page)),
  };

  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({
    queryKey: charactersQueryKey(queryParams),
    queryFn: () => fetchCharacters(queryParams),
  });

  const dehydratedState = dehydrate(queryClient);

  return <CharactersPageClient dehydratedState={dehydratedState} params={queryParams} />;
}
