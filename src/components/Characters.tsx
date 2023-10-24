import { useEffect, useState } from "react";
import { Character, getRickAndMortyCharacters } from "@/api/rickAndMortyAPI";
import Image from "next/image";
import styles from "@/styles/Characters.module.css";

type CharactersProps = {
  currentPage: number | undefined;
  setTotalPages: (newPage: number) => void;
};

export default function Characters({
  currentPage,
  setTotalPages,
}: CharactersProps) {
  const [data, setData] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    const getData = async () => {
      if (currentPage) {
        setIsLoading(true);
        try {
          const result = await getRickAndMortyCharacters(currentPage);
          if (result.info?.pages) {
            setTotalPages(result.info?.pages);
          }
          if (result.results) {
            setData(result.results);
          } else {
            setData([]);
            setError("No characters found.");
          }
        } catch {
          setError("Failed to get characters.");
        }
        setIsLoading(false);
      }
    };

    getData();
  }, [currentPage, setTotalPages]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      {data &&
        data?.map(character => (
          <div key={character.id} className={styles.item}>
            <Image
              className={styles.image}
              src={character.image}
              width={300}
              height={300}
              alt={`avatar of ${character.name}`}
            />
            <p className={styles.name}>{character.name}</p>
          </div>
        ))}
    </div>
  );
}
