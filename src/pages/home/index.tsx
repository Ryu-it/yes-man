import { useState } from "react";
import Button from "../../components/Button";
import Level2 from "./Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";
import Level6 from "./Level6";
import Level7 from "./Level7";
import GameOver from "./GameOver";

type Screen = "home" | "level2" | "level3" | "level4" | "level5" | "level6" | "level7" | "gameover";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");

  if (screen === "level2") {
    return <Level2 onYes={() => setScreen("level3")} onNo={() => setScreen("gameover")} />;
  }
  if (screen === "level3") {
    return <Level3 onYes={() => setScreen("level4")} onNo={() => setScreen("gameover")} />;
  }
  if (screen === "level4") {
    return <Level4 onYes={() => setScreen("level5")} onNo={() => setScreen("gameover")} />;
  }
  if (screen === "level5") {
    return <Level5 onYes={() => setScreen("level6")} onNo={() => setScreen("gameover")} />;
  }
  if (screen === "level6") {
    return <Level6 onYes={() => setScreen("level7")} onNo={() => setScreen("gameover")} />;
  }
  if (screen === "level7") {
    return <Level7 onYes={() => setScreen("home")} onNo={() => setScreen("gameover")} />;
    // ↑ Level7の「はい」の行き先は、とりあえず home に戻す例（クリア画面が欲しければ "clear" を追加）
  }
  if (screen === "gameover") {
    return <GameOver onBack={() => setScreen("home")} />;
  }  

  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">ゲーム開始！</h1>
      <p>進みますか？</p>

      <div className="flex justify-center gap-4">
        <Button onClick={() => setScreen("level2")}>はい</Button>
        <Button onClick={() => setScreen("gameover")}>いいえ</Button>
      </div>
    </div>
  );
}


