'use client';

import { startTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error('error: ', error);
  }, [error]);
  const router = useRouter();

  return (
    <div>
      <h3>오류가 발생했습니다</h3>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); //현재 페이지에 필요한 서버 컴포넌트를 다시 불러옴(에러 상태를 초기화시키지는 않음)
            reset(); //에러 상태를 초기화, 컴포넌트들을 다시 렌더링
          });
        }}
      >
        다시시도
      </button>
    </div>
  );
};

export default Error;
