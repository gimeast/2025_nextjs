import Link from "next/link";
import Paging from "@/components/common/Paging";

export default function TodoList({ data, queryObj }) {
  const { list, total } = data;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          총 <span className="font-semibold text-blue-600">{total}</span>개의 할 일
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {list.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            등록된 할 일이 없습니다.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {list.map((todo) => (
              <Link
                key={todo.tno}
                href={`/todo/read/${todo.tno}?${queryObj.toString()}`}
                className="flex items-center gap-4 p-5 hover:bg-blue-50 transition-colors"
              >
                <span className="flex-shrink-0 text-2xl font-bold text-gray-400">
                  #{todo.tno}
                </span>

                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-gray-900 truncate">
                    {todo.title}
                  </h2>
                </div>

                <div className="flex-shrink-0 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-700 font-semibold text-sm">
                      {todo.writer.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {todo.writer}
                  </span>
                </div>

                <div className="flex-shrink-0 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Paging totalCount={total} page={queryObj.get("page")} size={10} />
      </div>
    </div>
  );
}
