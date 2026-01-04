// src/pages/home/Home.tsx
import { useMemo, useState } from "react";
import Button from "../../components/Button";

import Level2 from "./Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";
import Level6 from "./Level6";
import Level7 from "./Level7";
import GameOver from "./GameOver";
import GameClear from "./GameClear";

// ✅ 追加：カーソルに近づいてくる「はい」
import ChasingYesButton from "./ChasingYesButton";

import { GAME_OVER_CONFIG } from "./gameOverConfig";
import type { LevelKey } from "./gameOverConfig";

type Screen =
  | "home"
  | "level2"
  | "level3"
  | "level4"
  | "level5"
  | "level6"
  | "level7"
  | "gameover"
  | "gameclear";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [gameOverFrom, setGameOverFrom] = useState<LevelKey | null>(null);

  // どのレベルで負けたかをセットして gameover へ
  const goGameOver = (from: LevelKey) => {
    setGameOverFrom(from);
    setScreen("gameover");
  };

  // XシェアURLを作る（親でロジックを持つ）
  const shareUrl = useMemo(() => {
    if (!gameOverFrom) return "https://twitter.com/intent/tweet?text=";

    const config = GAME_OVER_CONFIG[gameOverFrom];
    const text = config.shareText({ level: gameOverFrom });

    const url = window.location.href;

    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;

    return intent;
  }, [gameOverFrom]);

  // GameOver表示に必要なデータ（親で決める）
  const gameOverView = useMemo(() => {
    if (!gameOverFrom) return null;
    return GAME_OVER_CONFIG[gameOverFrom];
  }, [gameOverFrom]);

  if (screen === "level2") {
    return (
      <Level2 onYes={() => setScreen("level3")} onNo={() => goGameOver("level2")} />
    );
  }
  if (screen === "level3") {
    return (
      <Level3 onYes={() => setScreen("level4")} onNo={() => goGameOver("level3")} />
    );
  }
  if (screen === "level4") {
    return (
      <Level4 onYes={() => setScreen("level5")} onNo={() => goGameOver("level4")} />
    );
  }
  if (screen === "level5") {
    return (
      <Level5 onYes={() => setScreen("level6")} onNo={() => goGameOver("level5")} />
    );
  }
  if (screen === "level6") {
    return (
      <Level6 onYes={() => setScreen("level7")} onNo={() => goGameOver("level6")} />
    );
  }
  if (screen === "level7") {
    return (
      <Level7 onYes={() => setScreen("gameclear")} onNo={() => goGameOver("level7")} />
    );
  }

  // ✅ ここを追加：gameclear は gameover と別の分岐
if (screen === "gameclear") {
  return (
    <GameClear
      onBack={() => {
        setGameOverFrom(null);
        setScreen("home");
      }}
    />
  );
}

if (screen === "gameover") {
  if (!gameOverView) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-red-600">ゲームオーバー</h1>
        <Button
          onClick={() => {
            setGameOverFrom(null);
            setScreen("home");
          }}
        >
          最初から
        </Button>
      </div>
    );
  }

  return (
    <GameOver
      title={gameOverView.title}
      message={gameOverView.message}
      shareUrl={shareUrl}
      onBack={() => {
        setGameOverFrom(null);
        setScreen("home");
      }}
    />
  );
}


  // ✅ home（ここを差し替え）
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center mt-10">ゲーム開始！</h1>
      <p className="text-xl text-center mt-10">はいがあなたに懐いている</p>

      {/* 追尾する「はい」 */}
      <ChasingYesButton onYes={() => setScreen("level2")} />

      {/* いいえ（即ゲームオーバー） */}
      <div className="flex justify-center mt-6">
        <Button onClick={() => goGameOver("level2")}>いいえ</Button>
      </div>
    </div>
  );
}
