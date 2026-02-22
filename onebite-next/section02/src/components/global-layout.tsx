import style from './global-layout.module.css';
import { ReactNode } from 'react';
import Link from 'next/link';

const GlobalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href="/">📚 OneBite Books</Link>
      </header>
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>제작 @gimeast</footer>
    </div>
  );
};

export default GlobalLayout;
