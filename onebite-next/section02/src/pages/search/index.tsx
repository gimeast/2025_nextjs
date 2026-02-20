import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { q } = router.query;
  return <div>Search {q}</div>;
};

export default Page;
