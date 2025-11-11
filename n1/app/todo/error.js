"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  console.dir(error);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* 에러 아이콘 */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* 에러 제목 */}
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
            문제가 발생했습니다
          </h1>

          {/* 에러 메시지 */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800 text-center font-medium">
              {error.message || "알 수 없는 오류가 발생했습니다."}
            </p>
          </div>

          {/* 설명 */}
          <p className="text-gray-600 text-center mb-8">
            요청을 처리하는 중에 오류가 발생했습니다.<br />
            잠시 후 다시 시도해 주세요.
          </p>

          {/* 버튼 그룹 */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              다시 시도
            </button>
            <Link
              href="/todo/list"
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors text-center"
            >
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
