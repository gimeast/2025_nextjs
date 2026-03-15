import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '@/api/delete-todo.ts';
import { QUERY_KEYS } from '@/lib/constant.ts';
import type { Todo } from '@/types.ts';

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,

    //캐시데이터를 업데이트하는 방법들
    //1. 캐시 무효화 -> invalidateQueries
    //2. 요청의 응답값 활용 -> onSuccess
    //3. 낙관적 업데이트 -> onMutate

    onSuccess: (deletedTodo) => {
      // queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
      //   if (!prevTodos) return [];
      //   return prevTodos.filter((prevTodo) => prevTodo.id !== deletedTodo.id);
      // });

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.todo.detail(deletedTodo.id),
      });
      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (prevTodoIds) => {
          if (!prevTodoIds) return [];
          return prevTodoIds.filter(
            (prevTodoId) => prevTodoId !== deletedTodo.id,
          );
        },
      );
    },
  });
}
