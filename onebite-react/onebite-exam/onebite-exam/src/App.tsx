import './App.css';

function App() {
  return (
    <div>
      {/* 1. 타이포그래피 */}
      <div className="text-xs text-red-500">text-xs</div>
      <div className="text-sm text-[rgb(100,30,200)]">text-sm</div>
      <div className="text-lg font-bold">text-lg</div>
      <div className="text-xl font-extrabold">text-xl</div>
      <div className="text-2xl font-black">text-2xl</div>
      <div className="text-[13px]">text-[13px]</div>

      {/* 2. 백그라운드 컬러 */}
      <div className="bg-amber-500">amber-500</div>

      {/* 3. 사이즈 */}
      <div className="w-20 bg-blue-500">box</div>
      <div className="w-[20px] bg-green-500">box</div>
      <div className="w-full bg-yellow-500">box</div>

      {/* 4. 높이 */}
      <div className="h-20 w-full bg-blue-500">box</div>

      {/* 5. 패딩, 마진 */}
      <div className="m-5 h-50 w-50 bg-red-400 p-5">
        <div className="h-full w-full bg-blue-400"></div>
      </div>
      <div className="mt-4 ml-5 h-50 w-50 bg-yellow-400 pt-5 pr-4 pb-3 pl-2">
        <div className="h-full w-full bg-blue-400"></div>
      </div>
      <div className="mx-5 my-5 h-50 w-50 bg-red-400 px-5 py-5">
        <div className="h-full w-full bg-blue-400"></div>
      </div>
    </div>
  );
}

export default App;
