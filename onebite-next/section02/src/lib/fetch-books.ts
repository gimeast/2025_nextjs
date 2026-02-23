import { BookData } from '@/types';

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  const url = `https://onebite-books-server-main-delta-ten.vercel.app/book${q ? `/search?q=${q}` : ''}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
