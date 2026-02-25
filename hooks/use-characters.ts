import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { fetchCharacters, type FetchCharactersParams } from "@/lib/api/characters";
import type { CharactersResponse } from "@/types/character";

export type UseCharactersParams = FetchCharactersParams;

export const charactersQueryKey = (params: UseCharactersParams) =>
  ["characters", params.status ?? "all", params.gender ?? "all", params.page ?? 1] as const;

export function useCharacters(
  params: UseCharactersParams,
): UseQueryResult<CharactersResponse, Error> {
  return useQuery<CharactersResponse, Error>({
    queryKey: charactersQueryKey(params),
    queryFn: () => fetchCharacters(params),
  });
}
