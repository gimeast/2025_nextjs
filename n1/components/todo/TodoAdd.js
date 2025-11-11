"use client";

import { useActionState } from "react";
import { postTodo } from "@/actions/todoActions";
import { useRouter } from "next/navigation";

export default function TodoAdd() {
  const [state, formAction, isPending] = useActionState(postTodo, { result: "" });
  const router = useRouter();

  const handleGoToList = () => {
    router.push("/todo/list");
  };

  return (
    <div className="max-w-2xl mx-auto">
      {state.result && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-green-800 font-medium">할 일이 성공적으로 등록되었습니다!</span>
            <button
              onClick={handleGoToList}
              className="mt-2 px-6 py-2 border border-transparent text-base font-medium bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700"
            >
              목록 화면으로 이동
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">새 할 일 등록</h2>

        <form action={formAction} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
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
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="작성자 이름을 입력하세요"
            />
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
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg cursor-pointer"
              >
                등록하기
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
