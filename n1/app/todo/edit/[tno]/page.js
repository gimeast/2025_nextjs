import TodoEdit from "@/components/todo/TodoEdit";

export default async function TodoEditPage({ params, searchParams }) {
  const paramObj = await params;
  const { page = "1" } = await searchParams;

  const queryObj = new URLSearchParams();
  queryObj.set("page", page);

  const res = await fetch(`http://localhost:8080/api/todos/${paramObj.tno}`);
  const todo = await res.json();

  return (
    <div>
      Todo Edit Page
      <TodoEdit todo={todo} queryStr={queryObj.toString()} />
    </div>
  );
}
