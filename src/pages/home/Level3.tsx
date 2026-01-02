import { useEffect, useState } from "react";
import Button from "../../components/Button";

type Props = { onYes: () => void; onNo: () => void };

const MIN = 5;
const MAX = 85;
const MAX_RUNS = 20;

function randomPos() {
  return {
    top: MIN + Math.random() * (MAX - MIN),
    left: MIN + Math.random() * (MAX - MIN),
  };
}

export default function Level3({ onYes, onNo }: Props) {
  const [pos, setPos] = useState(() => randomPos());
  const [runCount, setRunCount] = useState(0);

  useEffect(() => {
    setPos(randomPos());
  }, []);

  const isTired = runCount >= MAX_RUNS;

  const runAway = () => {
    if (isTired) return; // 疲れたら逃げない

    setRunCount((c) => c + 1);
    setPos(randomPos());
  };

  return (
    <div className="relative w-full h-[80vh] text-center">
      <h1 className="text-3xl font-bold mb-2">レベル3</h1>

      <p className="mb-4">
        「はい」が逃げます
        {isTired && "（疲れて動けない…！）"}
      </p>

      {/* 逃げる/疲れる「はい」 */}
      <div
        className={[
          "absolute transition-all duration-200",
          isTired ? "animate-tired-bob" : "",
        ].join(" ")}
        style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
        onMouseEnter={runAway}
      >
        {/* 汗 */}
        {isTired && (
          <div className="absolute -top-6 -right-6 text-2xl animate-sweat-pop select-none">
            💦
          </div>
        )}

        <Button onClick={onYes}>はい</Button>
      </div>

      {/* いいえ */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <Button onClick={onNo}>いいえ</Button>
      </div>
    </div>
  );
}
