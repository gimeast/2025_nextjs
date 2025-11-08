import Link from "next/link";
import TodoRead from "@/components/todo/TodoRead";

export default async function TodoReadPage({ params, searchParams }) {
  const { tno } = await params;
  const { page = "1" } = await searchParams;
  const queryObj = new URLSearchParams();
  queryObj.set("page", page);

  const res = await fetch(`http://localhost:8080/api/todos/${tno}`);
  const result = await res.json();
  console.log("result", result);

  return (
    <div>
      <TodoRead data={result} queryObj={queryObj} />
    </div>
  );
}
