// src/pages/home/index.tsx
import { useState } from "react";
import Button from "../../components/Button";
import Level2 from "./Level2";

type Screen = "home" | "level2";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");

  const handleYes = () => {
    setScreen("level2");
  };

  const handleNo = () => {
    alert("いいえ が押されました");
  };

  // ★ ここがポイント：表示を切り替える
  if (screen === "level2") {
    return <Level2 onBack={() => setScreen("home")} />;
  }

  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">ゲーム開始いいいいいい！</h1>

      <div className="flex justify-center gap-4">
        <Button onClick={handleYes}>はい</Button>
        <Button onClick={handleNo}>いいえ</Button>
      </div>
    </div>
  );
}

