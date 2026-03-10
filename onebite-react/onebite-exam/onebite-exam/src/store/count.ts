import { create } from 'zustand';

type Store = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

// store 생성
export const useCountStore = create<Store>((set, get) => ({
  count: 0, //state
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
}));
