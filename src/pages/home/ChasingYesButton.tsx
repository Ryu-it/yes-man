import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";

type Props = {
  onYes: () => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ChasingYesButton({ onYes }: Props) {
  const areaRef = useRef<HTMLDivElement | null>(null);

  // ボタンの現在位置（%）
  const [pos, setPos] = useState({ x: 50, y: 55 }); // 初期位置は中央付近
  const targetRef = useRef({ x: 50, y: 55 }); // 目標（カーソルに近い場所）

  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width) * 100;
      const py = ((e.clientY - r.top) / r.height) * 100;

      // 画面外に行かないように少し余白を取る
      targetRef.current = {
        x: clamp(px, 5, 95),
        y: clamp(py, 10, 90),
      };
    };

    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      // 現在位置 → 目標位置へ じわっと近づける（追尾の強さ）
      const k = 0.07; // 0.03〜0.12くらいで調整
      setPos((p) => ({
        x: p.x + (targetRef.current.x - p.x) * k,
        y: p.y + (targetRef.current.y - p.y) * k,
      }));
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={areaRef} className="relative w-full h-[70vh] overflow-hidden">
      {/* 追尾する「はい」 */}
      <div
        className="absolute"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <Button onClick={onYes}>はい</Button>
      </div>
    </div>
  );
}
