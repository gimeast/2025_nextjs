import { Button } from '@/components/ui/button.tsx';
import type { Todo } from '@/types.ts';
import { useDeleteTodo } from '@/store/todos.ts';

const TodoItem = ({ id, content }: Todo) => {
  const deleteTodo = useDeleteTodo();

  const handleDeleteClick = () => {
    deleteTodo(id);
  };

  return (
    <div className="flex items-center justify-between border p-2">
      {content}
      <Button variant="destructive" onClick={handleDeleteClick}>
        삭제
      </Button>
    </div>
  );
};

export default TodoItem;
