import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Characters from "@/components/Characters";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>();
  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    if (typeof router.query.page === "string") {
      setCurrentPage(parseInt(router.query.page, 10));
    } else {
      setCurrentPage(1)
    }
  }, [router.query.page]);

  const onPageChange = (number: number) => {
    setCurrentPage(number)
    router.push({
      query: { page: number }
    });
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
        <Characters currentPage={currentPage} setTotalPages={setTotalPages} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </main>
    </>
  );
}
