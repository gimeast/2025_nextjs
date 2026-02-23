import style from './[id].module.css';
import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next';
import fetchOneBook from '@/lib/fetchOneBook';
import { useRouter } from 'next/router';
import Head from 'next/head';

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    // fallback: false, // 404 Not Found
    // fallback: 'blocking', // 생성되지 않은 경로 요청 시, 서버에서 getStaticProps를 실행하고 완료될 때까지 사용자는 대기한다. 완성된 HTML을 반환한 뒤 정적 파일로 캐시되어 이후 같은 경로는 SSG 방식으로 동작한다.
    fallback: true, // 생성되지 않은 경로 요청 시, props가 비어있는 fallback 페이지를 즉시 반환하고, 백그라운드에서 getStaticProps를 실행한 뒤 완료되면 클라이언트에 데이터를 전달하여 리렌더링한다. 이후 같은 경로는 SSG 방식으로 동작한다.
  };
};

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

const Page = ({ book }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입북스</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입북스" />
          <meta
            property="og:description"
            content="한입 북스에 등록된 도서들을 만나보세요"
          />
        </Head>
        <div>로딩중입니다.</div>
      </>
    );
  }

  if (!book) return '문제가 발생했습니다 다시 시도하세요';

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} alt={`${title} 이미지`} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
};

export default Page;
