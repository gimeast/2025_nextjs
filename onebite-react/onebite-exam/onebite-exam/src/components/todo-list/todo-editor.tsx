import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useCreateTodo } from '@/store/todos.ts';
import { useState } from 'react';

const TodoEditor = () => {
  const createTodo = useCreateTodo();
  const [content, setContent] = useState('');

  const handleAddClick = () => {
    if (content.trim() === '') return;
    createTodo(content);
    setContent('');
  };

  return (
    <div className="flex gap-2">
      <Input
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder="새로운 할 일을 입력하세요 ..."
      />
      <Button onClick={handleAddClick}>추가</Button>
    </div>
  );
};

export default TodoEditor;
