import { useMutation } from '@tanstack/react-query';
import { createTodo } from '@/api/create-todo.ts';

export function useCreateTodoMutation() {
  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {}, // 요청이 시작되었을때
    onSettled: () => {}, // 요청이 종료되었을때
    onSuccess: () => {}, //요청이 성공하였을때
    onError: (error) => {
      window.alert(error.message);
    }, //요청이 실패하였을때
  });
}
