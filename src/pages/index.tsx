import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Characters from "@/components/Characters";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next";
import { getRickAndMortyCharacters } from "@/api/rickAndMortyAPI";
import { Character } from "@/types/characterTypes";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  let page = 1;
  let totalPages = null;
  let data: Character[] = [];
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
      return {
        notFound: true,
      };
    }
  } catch {
    return {
      notFound: true,
    };
  }
  return { props: { page, totalPages, data } };
};

export default function Home({
  page,
  totalPages,
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(page);

  const onPageChange = (number: number) => {
    setCurrentPage(number);
    router.push({
      query: { page: number },
    });
  };

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
