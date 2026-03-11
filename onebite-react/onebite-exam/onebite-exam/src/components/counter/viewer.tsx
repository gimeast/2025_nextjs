import { useCount } from '@/store/count.ts';

const Viewer = () => {
  const count = useCount();
  return <div>{count}</div>;
};

export default Viewer;
