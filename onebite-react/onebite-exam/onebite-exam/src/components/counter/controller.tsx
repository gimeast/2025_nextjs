import { Button } from '@/components/ui/button.tsx';
import { useDecreaseCount, useIncreaseCount } from '@/store/count.ts';

const Controller = () => {
  //방법1: selector 함수를 사용하여 count가 변경될때 Controller가 리렌더링되는걸 방지할수있다.
  // const increase = useCountStore((store) => store.increase);
  // const decrease = useCountStore((store) => store.decrease);

  //방법2: count.ts에 actions로 increase, decrease를 감싸서 사용
  // const { increase, decrease } = useCountStore((store) => store.actions);

  //방법3: 커스텀 훅 사용
  const increase = useIncreaseCount();
  const decrease = useDecreaseCount();

  return (
    <div>
      <Button onClick={increase}>+1</Button>
      <Button onClick={decrease}>-1</Button>
    </div>
  );
};

export default Controller;
