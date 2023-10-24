import { useEffect, useState } from "react";
import { getRickAndMortyCharacters } from "@/api/rickAndMortyAPI";
import { Character } from "@/types/characterTypes";
import Image from "next/image";
import styles from "@/styles/Characters.module.css";

type CharactersProps = {
  characters: Character[];
};

export default function Characters({ characters }: CharactersProps) {
  return (
    <div className={styles.container}>
      {characters &&
        characters?.map(character => (
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
