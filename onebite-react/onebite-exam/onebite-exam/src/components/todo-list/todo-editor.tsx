import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';
import { useCreateTodoMutation } from '@/hooks/mutations/use-create-todo-mutation.ts';

const TodoEditor = () => {
  const { mutate, isPending } = useCreateTodoMutation();
  const [content, setContent] = useState('');

  const handleAddClick = () => {
    if (content.trim() === '') return;
    mutate(content);

    setContent('');
  };

  return (
    <div className="flex gap-2">
      <Input
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder="새로운 할 일을 입력하세요 ..."
      />
      <Button onClick={handleAddClick} disabled={isPending}>
        추가
      </Button>
    </div>
  );
};

export default TodoEditor;
