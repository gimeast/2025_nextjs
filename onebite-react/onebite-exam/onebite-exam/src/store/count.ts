import { create } from 'zustand';

type Store = {
  count: number;
  actions: {
    increase: () => void;
    decrease: () => void;
  };
};

// store 생성
export const useCountStore = create<Store>((set, get) => ({
  count: 0, //state
  actions: {
    increase: () => {
      //명시되어있는 프로퍼티의 값만 업데이트 하기때문에 나머지(increase, decrease)는 명시하지 않아도 된다.
      set((store) => ({
        count: store.count + 1,
      }));
    }, //action
    decrease: () => {
      set((store) => ({
        count: store.count - 1,
      }));
    }, //action
  },
}));

export const useCount = () => {
  const count = useCountStore((store) => store.count);
  return count;
};
export const useIncreaseCount = () => {
  const increase = useCountStore((store) => store.actions.increase);
  return increase;
};
export const useDecreaseCount = () => {
  const decrease = useCountStore((store) => store.actions.decrease);
  return decrease;
};
