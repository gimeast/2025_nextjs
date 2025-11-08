import Link from "next/link";

export default function TodoRead({ data, queryObj }) {
  return (
    <div>
      <Link href={`/todo/list?${queryObj.toString()}`}>목록으로</Link>
      <h2>
        {data.tno} {data.title}
      </h2>
      <p>{data.writer}</p>
    </div>
  );
}
