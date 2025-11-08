import TodoList from "@/components/todo/TodoList";

export default async function TodoListPage({ searchParams }) {
  const { page = "1" } = await searchParams;
  const queryObj = new URLSearchParams();
  queryObj.set("page", page);
  console.log("queryObj", queryObj);

  const res = await fetch(`http://localhost:8080/api/todos/list?page=${page}`);
  const result = await res.json();
  console.log("result", result);
  console.log("page", page);

  return (
    <div>
      <TodoList data={result} queryObj={queryObj} />
    </div>
  );
}
