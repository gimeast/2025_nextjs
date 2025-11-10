import Link from "next/link";

export default function TodoRead({ data, queryObj }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href={`/todo/list?${queryObj.toString()}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          목록으로
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-start gap-4 mb-6 pb-6 border-b">
          <span className="text-3xl font-bold text-gray-400">#{data.tno}</span>
          <h2 className="text-3xl font-bold text-gray-900">{data.title}</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 w-24">작성자</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-700 font-semibold text-sm">{data.writer.charAt(0).toUpperCase()}</span>
              </div>
              <span className="font-medium text-gray-900">{data.writer}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 w-24">완료 여부</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${data.completed ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
            >
              {data.completed ? "완료" : "미완료"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 w-24">작성일</span>
            <span className="text-gray-900">{data.createdDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
