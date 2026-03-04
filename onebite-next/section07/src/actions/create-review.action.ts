'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!bookId || !content || !author) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      { method: 'POST', body: JSON.stringify({ bookId, content, author }) },
    );

    //Next 서버측에게 재검증하도록 요청하는 메서드, 리뷰뿐만 아니라 상세정보 데이터까지 모두 재검증을 하기때문에 태그를 사용하는게 효율적이다.
    //1.특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);

    //2.특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath('/book/[id]', 'page');

    //3.특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath('(with-searchbar)', 'layout');

    //4.모든 데이터를 재검증
    // revalidatePath('/', 'layout');

    //5.태그 기준. 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`);
  } catch (err) {
    console.error(err);
    return;
  }
}
