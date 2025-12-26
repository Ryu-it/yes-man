import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("ゲームを進めますか？");

  const handleYes = () => setMessage("OK！ゲームを開始します！");
  const handleNo = () => setMessage("了解！また今度にしましょう。");

  return (
    <div className="w-[min(90vw,420px)] flex flex-col items-center text-center gap-4">
      <h1 className="text-3xl font-bold">Yes-man</h1>
      <p className="text-lg">{message}</p>

      <div className="flex justify-center gap-3">
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

