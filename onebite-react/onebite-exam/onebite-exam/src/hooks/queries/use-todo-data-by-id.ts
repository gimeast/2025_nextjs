import { useQuery } from '@tanstack/react-query';
import { fetchTodoById } from '@/api/fetch-todo-by-id.ts';
import { QUERY_KEYS } from '@/lib/constant.ts';

export function useTodoDataById(id: string) {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: QUERY_KEYS.todo.detail(id),

    staleTime: 300000, //gcTime과는 별개로 동작한다.
    gcTime: 5000, //inactive 상태인 경우 gcTime 만큼 시간이 지나면 메모리에서 제거된다.
  });
}
