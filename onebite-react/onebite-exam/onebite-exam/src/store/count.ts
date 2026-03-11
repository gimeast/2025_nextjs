import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

//combine 미들웨어 사용시 state 타입이 자동으로 추론된다.
export const useCountStore = create(
  //immer는 복잡한 state를 다룰때 업데이트를 간편하게 해준다. 불변성을 유지하면서 간결하게 업데이트를 할수있도록 도와주는 미들웨어이다.
  immer(
    combine({ count: 0 }, (set, get) => ({
      actions: {
        increase: () => {
          //명시되어있는 프로퍼티의 값만 업데이트 하기때문에 나머지(increase, decrease)는 명시하지 않아도 된다.
          // set((state) => ({
          //   count: state.count + 1,
          // }));
          set((state) => {
            state.count += 1;
          });
        },
        decrease: () => {
          // set((state) => ({
          //   count: state.count - 1,
          // }));
          set((state) => {
            state.count -= 1;
          });
        },
      },
    })),
  ),
);

type Store = {
  count: number;
  actions: {
    increase: () => void;
    decrease: () => void;
  };
};
// store 생성
/*
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
*/

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
