import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '@/api/create-todo.ts';
import { QUERY_KEYS } from '@/lib/constant.ts';

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {}, // 요청이 시작되었을때
    onSettled: () => {}, // 요청이 종료되었을때
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
    }, //요청이 성공하였을때
    onError: (error) => {
      window.alert(error.message);
    }, //요청이 실패하였을때
  });
}
