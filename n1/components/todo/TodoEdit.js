"use client";

import { useActionState, useState } from "react";
import { putTodo } from "@/actions/todoActions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TodoDeleteModalCP from "@/components/todo/TodoDeleteModal";

export default function TodoEdit({ todo, queryStr }) {
  const [state, formAction, isPending] = useActionState(putTodo, { result: "" });
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => {
    router.replace(`/todo/list?${queryStr}`);
  };

  const handleGoToRead = () => {
    router.replace(`/todo/read/${todo.tno}?${queryStr}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {isModalOpen && <TodoDeleteModalCP onClose={onClose} changeShow={setIsModalOpen} tno={todo.tno} />}

      {state.result && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-green-800 font-medium">할 일이 성공적으로 수정되었습니다!</span>
            </div>
            <button
              onClick={handleGoToRead}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              상세보기로 이동
            </button>
          </div>
        </div>
      )}

      <div className="mb-6">
        <Link
          href={`/todo/read/${todo.tno}?${queryStr}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          뒤로 가기
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">할 일 수정</h2>

        <form action={formAction} className="space-y-6">
          <div>
            <label htmlFor="tno" className="block text-sm font-semibold text-gray-700 mb-2">
              번호
            </label>
            <input
              type="text"
              id="tno"
              name="tno"
              defaultValue={todo.tno}
              readOnly
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={todo.title}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="할 일을 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="writer" className="block text-sm font-semibold text-gray-700 mb-2">
              작성자
            </label>
            <input
              type="text"
              id="writer"
              name="writer"
              defaultValue={todo.writer}
              readOnly
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="completed" className="block text-sm font-semibold text-gray-700 mb-2">
              완료 여부
            </label>
            <select
              id="completed"
              name="completed"
              defaultValue={todo.completed.toString()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white cursor-pointer"
            >
              <option value="false">미완료</option>
              <option value="true">완료</option>
            </select>
          </div>

          <div className="pt-4">
            {isPending ? (
              <button
                type="button"
                disabled
                className="w-full px-6 py-3 bg-blue-400 text-white font-semibold rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                처리 중...
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  수정하기
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  삭제
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
