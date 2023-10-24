import { CharactersAPIResponse } from "@/types/characterTypes";

const baseUrl = "https://rickandmortyapi.com/api/character";

export async function getRickAndMortyCharacters(page: number): Promise<CharactersAPIResponse> {
  const response = await fetch(`${baseUrl}/?page=${page}`);
  const data = await response.json();
  return data;
}
