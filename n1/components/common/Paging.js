import Link from "next/link";

export default function Paging({ totalCount, page, size }) {
  const blockSize = 10;

  const blockEnd = Math.ceil(page / blockSize) * blockSize;
  const totalPages = Math.ceil(totalCount / Number(size));

  const pageStart = blockEnd - (blockSize - 1);
  const pageEnd = totalPages < blockEnd ? totalPages : blockEnd;

  const hasPrev = pageStart > 1;
  const hasNext = blockEnd < totalPages;

  const pages = Array.from({ length: pageEnd - pageStart + 1 }, (_, index) => pageStart + index);

  return (
    <div>
      <ul className="flex">
        {hasPrev && (
          <li className="m-2 p-2 bg-blue-200">
            <Link href={`/todo/list?page=${pageStart - 1}`}>Prev</Link>
          </li>
        )}

        {pages.map((pageNum) => {
          const isCurrentPage = pageNum === Number(page);
          return (
            <li key={pageNum} className="m-2">
              {isCurrentPage ? (
                <span className="block p-2 bg-blue-600 text-white font-bold cursor-not-allowed rounded">
                  {pageNum}
                </span>
              ) : (
                <Link href={`/todo/list?page=${pageNum}`} className="block p-2 bg-blue-200 hover:bg-blue-300 transition-colors rounded">
                  {pageNum}
                </Link>
              )}
            </li>
          );
        })}

        {hasNext && (
          <li className="m-2 p-2 bg-blue-200">
            <Link href={`/todo/list?page=${pageEnd + 1}`}>Next</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
