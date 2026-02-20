import style from './index.module.css';
import { ReactNode } from 'react';
import SearchableLayout from '@/components/searchable-layout';

const Home = () => {
  return <h1 className={style.h1}>Index</h1>;
};

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
export default Home;
