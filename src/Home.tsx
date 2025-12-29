import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleYes = () => {
    navigate("/game");
  };

  const handleNo = () => {
    // 今まで通り
  };

  return (
    <div className="w-[min(90vw,420px)] flex flex-col items-center text-center gap-4">
      <h1 className="text-3xl font-bold">Yes-man</h1>
      <p className="text-lg">ゲームを進めますか？</p>

      <div className="flex gap-3">
        <button
          onClick={handleYes}
          className="px-5 py-2 rounded bg-blue-500 text-white"
        >
          はい
        </button>
        <button
          onClick={handleNo}
          className="px-5 py-2 rounded bg-gray-300"
        >
          いいえ
        </button>
      </div>
    </div>
  );
}

