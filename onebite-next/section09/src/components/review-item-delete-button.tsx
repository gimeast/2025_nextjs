'use client';

import style from '@/components/review-item.module.css';
import { deleteReviewAction } from '@/actions/delete-review.action';
import { useActionState, useEffect, useRef } from 'react';

const ReviewItemDeleteButton = ({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) => {
  //특정 요구사항으로인해 button이 아닌 div와 form으로 작업을 하게될 경우의 예시
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null,
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);
  return (
    <form action={formAction} ref={formRef}>
      <input type="text" name="reviewId" value={reviewId} hidden readOnly />
      <input type="text" name="bookId" value={bookId} hidden readOnly />
      {isPending ? (
        <div>...</div>
      ) : (
        <div
          onClick={() => formRef.current?.requestSubmit()}
          className={style.delete_btn}
        >
          삭제하기
        </div>
      )}
    </form>
  );
};

export default ReviewItemDeleteButton;
