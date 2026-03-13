import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '@/api/update-todo.ts';
import { QUERY_KEYS } from '@/lib/constant.ts';
import type { Todo } from '@/types.ts';

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onMutate: (updatedTodo) => {
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.map((prevTodo) =>
          prevTodo.id === updatedTodo.id
            ? { ...prevTodo, ...updatedTodo }
            : prevTodo,
        );
      });
    },
  });
}
