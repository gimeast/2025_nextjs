import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '@/api/create-todo.ts';
import { QUERY_KEYS } from '@/lib/constant.ts';
import type { Todo } from '@/types.ts';

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {}, // 요청이 시작되었을때
    onSettled: () => {}, // 요청이 종료되었을때
    onSuccess: (newTodo) => {
      // 이렇게 invalidateQueries를 안사용하고 캐시 데이터를 직접 수정하여 refetch 없이 새로운 데이터를 화면에 바로 반영할수있다.
      // invalidate 방식은 item의 갯수가 많아지면 리페칭해야하는 데이터양이 증가하여 서버부하를 일으킬수있으므로
      // setQueryData를 사용하여 캐시에 직접 추가하여 서버부하를 방지할수있다.
      // queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
      //   if (!prevTodos) return [newTodo];
      //   return [...prevTodos, newTodo];
      // });

      queryClient.setQueryData<Todo>(
        QUERY_KEYS.todo.detail(newTodo.id),
        newTodo,
      );
      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (prevTodoIds) => {
          if (!prevTodoIds) return [newTodo.id];
          return [...prevTodoIds, newTodo.id];
        },
      );
    }, //요청이 성공하였을때
    onError: (error) => {
      window.alert(error.message);
    }, //요청이 실패하였을때
  });
}
