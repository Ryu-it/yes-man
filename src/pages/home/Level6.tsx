import { useEffect, useMemo, useState } from "react";
import Button from "../../components/Button";

type Props = { onYes: () => void; onNo: () => void };

// 当たり判定（px）
const HIT_RADIUS = 26;

// 明るさ計算用：この距離より遠いとほぼ真っ暗
const MAX_DIST = 520;

// クリックミス許容回数（0なら1回ミスで即GameOver）
const MAX_MISSES = 3;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function dist(ax: number, ay: number, bx: number, by: number) {
  const dx = ax - bx;
  const dy = ay - by;
  return Math.sqrt(dx * dx + dy * dy);
}

export default function Level6({ onYes, onNo }: Props) {
  // 当たり座標（画面内のどこか）※初回だけ確定
  const target = useMemo(() => {
    // 端すぎると理不尽なので少し余白をとる
    const margin = 60;
    const w = window.innerWidth;
    const h = window.innerHeight;

    return {
      x: margin + Math.random() * (Math.max(1, w - margin * 2)),
      y: margin + Math.random() * (Math.max(1, h - margin * 2)),
    };
  }, []);

  // マウス座標
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });

  // ミス回数
  const [misses, setMisses] = useState(0);

  // 近さ（0..1）を状態として持つ（UIフィードバックに使う）
  const [warmth, setWarmth] = useState(0);

  // マウス追跡
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setMouse({ x, y });

      const d = dist(x, y, target.x, target.y);
      // 近いほど 1、遠いほど 0
      const w = 1 - clamp(d / MAX_DIST, 0, 1);
      setWarmth(w);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [target.x, target.y]);

  // クリック判定（どこをクリックしても判定）
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      const d = dist(x, y, target.x, target.y);

      // 当たり！
      if (d <= HIT_RADIUS) {
        onYes();
        return;
      }

      // 外れ → ミスを増やす
      setMisses((m) => {
        const next = m + 1;
        if (next >= MAX_MISSES) {
          onNo();
        }
        return next;
      });
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [onYes, onNo, target.x, target.y]);

  // 近さに応じて “画面” を明るくする
  // 0.15〜1.0 の範囲で変化（完全な真っ暗を避ける）
  const brightness = 0.15 + warmth * 0.95;

  // 近さに応じたメッセージ
  const hint =
    warmth < 0.15
      ? "寒い… まだ遠い"
      : warmth < 0.35
      ? "ちょい寒い"
      : warmth < 0.6
      ? "あったかい"
      : warmth < 0.8
      ? "かなり熱い！"
      : "激アツ！！ すぐそこ";

  return (
    // 全画面ステージ（明るさはここにかける）
    <div
      className="fixed inset-0 bg-black flex items-center justify-center"
      style={{
        filter: `brightness(${brightness})`,
        transition: "filter 60ms linear",
      }}
    >
      {/* 中央UI（見た目はあるが、当たりは見えない） */}
      <div className="w-[min(92vw,520px)] rounded-2xl border border-white/10 bg-zinc-950/70 px-5 py-5 shadow-xl text-center">
        <h1 className="text-2xl font-bold text-white/90">レベル6</h1>
        <p className="mt-2 text-white/70 text-sm">
          画面のどこかに「見えない はい」があります。
          <br />
          <span className="text-white/50">
            近づくほど画面が明るくなります。
          </span>
        </p>

        <div className="mt-4">
          <div className="h-2 rounded bg-white/10 overflow-hidden">
            <div
              className="h-2 rounded bg-white/40"
              style={{ width: `${Math.round(warmth * 100)}%` }}
            />
          </div>
          <p className="mt-2 text-white/70 text-sm">
            ヒント：<span className="font-semibold">{hint}</span>
          </p>
          <p className="mt-1 text-white/40 text-xs">
            ミス：{misses} / {MAX_MISSES - 1}
          </p>
        </div>

        {/* いいえボタン（ここは普通に置く：押したらGameOver） */}
        <div className="mt-5 flex justify-center">
          <Button onClick={onNo}>いいえ</Button>
        </div>

        <p className="mt-3 text-[11px] text-white/35">
          コツ：中央からじゃなく、画面の端も探索してOK
        </p>
      </div>

      {/* 目立たないカーソル演出（任意） */}
      <div
        className="pointer-events-none fixed w-6 h-6 rounded-full border border-white/25"
        style={{
          left: mouse.x,
          top: mouse.y,
          transform: "translate(-50%, -50%)",
          opacity: 0.4 + warmth * 0.4,
        }}
      />
    </div>
  );
}

