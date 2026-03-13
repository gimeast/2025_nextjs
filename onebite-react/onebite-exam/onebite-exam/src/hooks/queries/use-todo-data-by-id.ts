import { useQuery } from '@tanstack/react-query';
import { fetchTodoById } from '@/api/fetch-todo-by-id.ts';

export function useTodoDataById(id: number) {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: ['todos', id],

    staleTime: 5000,

    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    // refetchInterval: false,
  });
}
