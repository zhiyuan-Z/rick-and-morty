import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Characters from "@/components/Characters";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getRickAndMortyCharacters } from "@/api/rickAndMortyAPI";
import { Character } from "@/types/characterTypes";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = (async context => {
  const { query } = context;
  let page = 1
  let totalPages = 1
  let data: Character[] = []
  let error = null;
  if (typeof query.page === "string") {
    page = parseInt(query.page, 10);
  }
  try {
    const result = await getRickAndMortyCharacters(page);
    if (result.info?.pages) {
      totalPages = result.info?.pages;
    }
    if (result.results) {
      data = result.results;
    } else {
      data = [];
      error = "No characters found.";
    }
  } catch {
    error = "Failed to get characters.";
  }
  return { props: { page, totalPages, data, error } };
}) satisfies GetServerSideProps<{
  page: number;
  totalPages: number;
  data: Character[];
  error: string | null;
}>;

export default function Home({page, totalPages, data, error}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(page);

  const onPageChange = (number: number) => {
    setCurrentPage(number);
    router.push({
      query: { page: number },
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Head>
        <title>Rick And Morty</title>
        <meta
          name="description"
          content="Assessment for Walmart React Dev role using Rick and Morty API"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1 className={styles.title}>Rick And Morty Characters</h1>
        <Characters characters={data} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </main>
    </>
  );
}
