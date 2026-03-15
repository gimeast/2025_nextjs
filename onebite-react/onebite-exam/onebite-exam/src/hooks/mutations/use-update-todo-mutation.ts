import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '@/api/update-todo.ts';
import { QUERY_KEYS } from '@/lib/constant.ts';
import type { Todo } from '@/types.ts';

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTodo) => {
      //조회요청이 완료된 이후 캐시가 이전 데이터로 업데이트 되지않도록 데이터 조회요청을 취소시킨다.
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.todo.list });

      //낙관적 업데이트를 할경우 api 통신 실패시 이전 값으로 되돌려야하므로 이전 todolist를 캐시에서 가져온다
      const prevTodos = queryClient.getQueryData<Todo[]>(QUERY_KEYS.todo.list);

      //낙관적 업데이트
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.map((prevTodo) =>
          prevTodo.id === updatedTodo.id
            ? { ...prevTodo, ...updatedTodo }
            : prevTodo,
        );
      });

      return {
        prevTodos,
      };
    },
    onError: (error, variables2, context) => {
      //context는 onMutate에서 반환한 값이된다.
      if (context && context.prevTodos) {
        queryClient.setQueryData<Todo[]>(
          QUERY_KEYS.todo.list,
          context.prevTodos,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
    },
  });
}
