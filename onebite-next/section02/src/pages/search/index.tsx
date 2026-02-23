import SearchableLayout from '@/components/searchable-layout';
import BookItem from '@/components/book-item';
import { ReactNode, useEffect, useState } from 'react';
import fetchBooks from '@/lib/fetch-books';
import { useRouter } from 'next/router';
import { BookData } from '@/types';
import Head from 'next/head';

const Page = () => {
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();
  const q = router.query.q as string;

  const fetchSearchResult = async () => {
    const res = await fetchBooks(q);
    setBooks(res);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);
  return (
    <>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      <div>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    </>
  );
};

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

export default Page;
