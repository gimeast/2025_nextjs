import style from './searchable-layout.module.css';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const SearchableLayout = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const q = router.query.q as string;

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onClickSearch = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onClickSearch();
  };

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          type="text"
          onKeyDown={onKeyDown}
          placeholder="검색어를 입력하세요..."
          onChange={onChangeSearch}
          value={search}
        />
        <button onClick={onClickSearch}>검색</button>
      </div>
      {children}
    </div>
  );
};

export default SearchableLayout;
