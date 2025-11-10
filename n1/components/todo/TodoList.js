import Link from "next/link";
import Paging from "@/components/common/Paging";

export default function TodoList({ data, queryObj }) {
  const { list, total } = data;
  return (
    <div>
      <ul>
        {list.map((todo) => (
          <li key={todo.tno}>
            <Link href={`/todo/read/${todo.tno}?${queryObj.toString()}`}>
              {todo.tno} -- {todo.title} -- {todo.writer}
            </Link>
          </li>
        ))}
      </ul>
      <Paging totalCount={total} page={queryObj.get("page")} size={10} />
    </div>
  );
}
