import { useMemo, useState } from "react";
import Button from "../../components/Button";

type Props = {
  onYes: () => void;
  onNo: () => void;
};

const YES_COUNT = 20;

export default function Level2({ onYes, onNo }: Props) {
  // 正解の「はい」を1つ決める（固定）
  const correctIndex = useMemo(
    () => Math.floor(Math.random() * YES_COUNT),
    []
  );

  // はいボタンの初期データ
  const initialYesButtons = useMemo(
    () =>
      Array.from({ length: YES_COUNT }, (_, index) => ({
        id: index,
        isCorrect: index === correctIndex,
        top: Math.random() * 80,
        left: Math.random() * 80,
        visible: true,
      })),
    [correctIndex]
  );

  // 表示・非表示を管理する state
  const [yesButtons, setYesButtons] = useState(initialYesButtons);

  const handleClickYes = (id: number, isCorrect: boolean) => {
    if (isCorrect) {
      onYes(); // 正解 → 次のステージ
      return;
    }

    // 偽物 → そのボタンだけ消す
    setYesButtons((prev) =>
      prev.map((btn) =>
        btn.id === id ? { ...btn, visible: false } : btn
      )
    );
  };

  return (
    <div className="relative w-full h-[80vh] text-center">
      <h1 className="text-3xl font-bold mb-6">
        本当の「はい」を探してください
      </h1>

      {/* はいボタンたち */}
      {yesButtons.map(
        (btn) =>
          btn.visible && (
            <div
              key={btn.id}
              className="absolute"
              style={{
                top: `${btn.top}%`,
                left: `${btn.left}%`,
              }}
            >
              <Button
                onClick={() =>
                  handleClickYes(btn.id, btn.isCorrect)
                }
              >
                はい
              </Button>
            </div>
          )
      )}

      {/* いいえ（即ゲームオーバー） */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <Button onClick={onNo}>いいえ</Button>
      </div>
    </div>
  );
}
