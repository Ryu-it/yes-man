import { useEffect, useMemo, useState } from "react";
import Button from "../../components/Button";

type Props = { onYes: () => void; onNo: () => void };

// 10秒で崩壊MAX（0〜5段階）
const DURATION_MS = 10_000;
const LEVEL_MAX = 5;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function corruptText(input: string, level: number) {
  if (level <= 0) return input;

  // レベルが上がるほど置換率UP
  const rate = 0.05 + level * 0.08;
  const map: Array<[RegExp, string]> = [
    [/は/g, "ﾊ"],
    [/い/g, "ｲ"],
    [/を/g, "ｦ"],
    [/押/g, "圧"],
    [/せ/g, "ｾ"],
    [/！/g, "!"],
    [/。/g, "."],
    [/、/g, ","],
  ];

  const gl = ["▓", "▒", "░", "█", "▚", "▞", "▙", "▛", "▜", "▟"];
  let s = input;

  // 軽い置換
  if (level >= 2) {
    for (const [re, rep] of map) s = s.replace(re, rep);
  }

  // グリッチ（ランダム置換）
  const out = s.split("").map((ch) => {
    if (ch === " " || ch === "\n") return ch;
    if (Math.random() < rate) return gl[Math.floor(Math.random() * gl.length)];
    return ch;
  });

  // レベル4以降で“欠け”
  if (level >= 4) {
    for (let i = 0; i < out.length; i++) {
      if (Math.random() < rate * 0.35) out[i] = "";
    }
  }

  return out.join("");
}

export default function Level5({ onYes, onNo }: Props) {
  const [level, setLevel] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const baseTitle = "レベル5：UIが崩壊していく";
  const baseBody =
    "警告：表示が崩れていきます。\nしかしゲームは正常に動いています。\n「はい」を押すだけで次のステージへ進みます。";

  // 表示文字はレベルに応じて崩す
  const title = useMemo(() => corruptText(baseTitle, level), [level]);
  const body = useMemo(() => corruptText(baseBody, level), [level]);

  // 10秒で0→5へ
  useEffect(() => {
    const startedAt = performance.now();
    const id = window.setInterval(() => {
      const now = performance.now();
      const e = now - startedAt;

      const eClamped = clamp(e, 0, DURATION_MS);
      setElapsed(eClamped);

      const nextLevel = Math.floor((eClamped / DURATION_MS) * LEVEL_MAX);
      setLevel(nextLevel);

      if (e >= DURATION_MS) window.clearInterval(id);
    }, 200);

    return () => window.clearInterval(id);
  }, []);

  const isBlackout = level >= LEVEL_MAX; // Lv5になったら真っ黒モード

  // 真っ黒モードでは「いいえ」だけ操作できる（Esc/N/Enter も全部 いいえに寄せる）
  useEffect(() => {
    if (!isBlackout) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "escape" || key === "n" || key === "enter") {
        onNo();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isBlackout, onNo]);

  const progress = Math.round((clamp(elapsed, 0, DURATION_MS) / DURATION_MS) * 100);

  // 見た目を徐々に消す：Lvが上がるほど薄くなる → Lv5で完全に0
  const vanishOpacity =
    isBlackout ? 0 : clamp(1 - level * 0.18 - (progress / 100) * 0.1, 0, 1);

  const chaosClass =
    level === 0
      ? ""
      : level === 1
      ? "chaos-1"
      : level === 2
      ? "chaos-2"
      : level === 3
      ? "chaos-3"
      : level === 4
      ? "chaos-4"
      : "chaos-5";

  return (
    // ✅ 画面全体を真っ黒にする（全画面固定）
    <div className="fixed inset-0 bg-black">
      {/* ✅ Lv5になったら “黒画面＋いいえだけ” */}
      {isBlackout ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            {/* 画面が真っ黒でも「いいえ」だけ出す */}
            <p className="text-white/40 text-sm">……</p>
            <Button onClick={onNo}>いいえ</Button>
          </div>
        </div>
      ) : (
        // ✅ Lv0〜4：崩壊していくUI（はい/いいえも含めて崩れる）
        <div className="w-full h-full flex items-center justify-center px-4">
          <div
            className={`w-full max-w-2xl transition-opacity duration-500 ${chaosClass}`}
            style={{ opacity: vanishOpacity }}
          >
            <div className="relative rounded-2xl border border-white/10 bg-zinc-950/80 shadow-xl overflow-hidden">
              {/* 背景ノイズ */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay">
                <div className="w-full h-full bg-[radial-gradient(circle_at_20%_10%,white,transparent_35%),radial-gradient(circle_at_80%_30%,white,transparent_30%),radial-gradient(circle_at_40%_90%,white,transparent_25%)]" />
              </div>

              <div className="relative px-5 py-4 border-b border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1">
                    <span className="text-red-300 animate-pulse">⚠</span>
                    <span className="text-sm font-semibold text-red-200 tracking-wide">
                      SYSTEM UI DEGRADED
                    </span>
                  </div>

                  <div className="text-xs text-white/50 tabular-nums">
                    chaos Lv {level}/{LEVEL_MAX}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="h-2 rounded bg-white/10 overflow-hidden">
                    <div
                      className="h-2 rounded bg-white/40"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="mt-1 text-[11px] text-white/40">
                    崩壊まで {Math.max(0, Math.ceil((DURATION_MS - elapsed) / 1000))} 秒
                  </div>
                </div>
              </div>

              <div className="relative px-5 py-5">
                <h1 className="text-2xl font-bold text-white/90 whitespace-pre-wrap leading-snug">
                  {title}
                </h1>

                <pre className="mt-4 font-mono text-sm text-white/70 whitespace-pre-wrap leading-relaxed">
                  {body}
                </pre>

                {/* ✅ ここでは「はい/いいえ」両方ある（Lv5で消える） */}
                <div className="mt-6 flex justify-center gap-4">
                  <Button onClick={onYes}>はい</Button>
                  <Button onClick={onNo}>いいえ</Button>
                </div>

                {/* スキャンライン */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
                  <div className="w-full h-full scanlines" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
