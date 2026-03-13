import { API_URL } from '@/lib/constant.ts';
import type { Todo } from '@/types.ts';

export async function fetchTodoById(id: number) {
  const response = await fetch(`${API_URL}/todos/${id}`);
  if (!response.ok) throw new Error('fetch failed');

  const data: Todo = await response.json();
  return data;
}
