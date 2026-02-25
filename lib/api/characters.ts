import type {
  CharacterGender,
  CharactersResponse,
  CharacterStatus,
} from "@/types/character";

const rickAndMortyBaseUrl = process.env.RICK_AND_MORTY_BASE_URL;

export interface FetchCharactersParams {
  status?: CharacterStatus;
  gender?: CharacterGender;
  page?: number;
}

interface ApiErrorResponse {
  error: string;
}

export async function fetchCharacters(
  params: FetchCharactersParams = {},
): Promise<CharactersResponse> {
  if (!rickAndMortyBaseUrl) {
    throw new Error("RICK_AND_MORTY_BASE_URL is not configured.");
  }

  const searchParams = new URLSearchParams();

  if (params.status) {
    searchParams.set("status", params.status);
  }

  if (params.gender) {
    searchParams.set("gender", params.gender);
  }

  if (typeof params.page === "number") {
    searchParams.set("page", String(params.page));
  }

  const query = searchParams.toString();
  const endpoint = `${rickAndMortyBaseUrl}/character${query ? `?${query}` : ""}`;

  const response = await fetch(endpoint, {
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = (await response.json()) as ApiErrorResponse;
    throw new Error(errorBody.error || "Failed to fetch characters.");
  }

  return (await response.json()) as CharactersResponse;
}
