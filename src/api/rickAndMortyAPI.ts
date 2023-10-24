const baseUrl = "https://rickandmortyapi.com/api/character";

export type CharacterLocation = {
  name: string;
  url: string;
};

export type Character = {
  id: number;
  name: string;
  url: string;
  created: string;
  status: "Dead" | "Alive" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
};

type Info<T> = {
  info?: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results?: T;
};

export async function getRickAndMortyCharacters(page: number): Promise<Info<Character[]>> {
  const response = await fetch(`${baseUrl}/?page=${page.toFixed(0)}`);
  const data = await response.json();
  return data;
}
