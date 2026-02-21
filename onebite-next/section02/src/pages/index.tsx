import style from './index.module.css';
import { ReactNode, useEffect } from 'react';
import SearchableLayout from '@/components/searchable-layout';
import BookItem from '@/components/book-item';
import books from '@/mock/books.json';
import { InferGetServerSidePropsType } from 'next';

export const getServerSideProps = () => {
  // 컴포넌트보다 먼저 실행되어 컴포넌트에 필요한 데이터를 불러오는 함수
  const data = 'hello';
  console.log('SSR 실행!');

  return {
    props: {
      data,
    },
  };
};

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log('data:', data);

  useEffect(() => {
    console.log(window);
  }, []);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
};

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
export default Home;
