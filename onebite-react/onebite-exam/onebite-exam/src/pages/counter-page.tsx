import { useCountStore } from '@/store/count.ts';
import { Button } from '@/components/ui/button.tsx';

const CounterPage = () => {
  const { count, increase, decrease } = useCountStore();
  return (
    <div>
      <h1 className="text-2xl font-bold">Counter</h1>
      <span>{count}</span>
      <div>
        <Button onClick={increase}>+1</Button>
        <Button onClick={decrease}>-1</Button>
      </div>
    </div>
  );
};

export default CounterPage;
