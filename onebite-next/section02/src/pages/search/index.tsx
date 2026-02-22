import SearchableLayout from '@/components/searchable-layout';
import BookItem from '@/components/book-item';
import { ReactNode, useEffect, useState } from 'react';
import fetchBooks from '@/lib/fetch-books';
import { useRouter } from 'next/router';
import { BookData } from '@/types';

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
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

export default Page;
