import { Button } from '@/components/ui/button.tsx';
import type { Todo } from '@/types.ts';
import { Link } from 'react-router';
import { useUpdateTodoMutation } from '@/hooks/mutations/use-update-todo-mutation.ts';
import { useDeleteTodoMutation } from '@/hooks/mutations/use-delete-todo-mutation.ts';

const TodoItem = ({ id, content, isDone }: Todo) => {
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo, isPending: isDeleteTodoPending } =
    useDeleteTodoMutation();

  const handleCheckboxClick = () => {
    updateTodo({
      id,
      isDone: !isDone,
    });
  };
  const handleDeleteClick = () => {
    deleteTodo(id);
  };

  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex gap-5">
        <input
          type="checkbox"
          checked={isDone}
          onClick={handleCheckboxClick}
          disabled={isDeleteTodoPending}
        />
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>
      <Button
        variant="destructive"
        onClick={handleDeleteClick}
        disabled={isDeleteTodoPending}
      >
        삭제
      </Button>
    </div>
  );
};

export default TodoItem;
