'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Searchbar = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <input type="text" value={search} onChange={onChangeSearch} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
};

export default Searchbar;
