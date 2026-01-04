import { useEffect, useMemo, useState } from "react";
import Button from "../../components/Button";

type Props = { onYes: () => void; onNo: () => void };

type LogLine = {
  id: string;
  level: "ERROR" | "WARN" | "INFO";
  text: string;
};

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeLogs(count: number): LogLine[] {
  const levels: LogLine["level"][] = ["ERROR", "WARN", "INFO"];

  const templates = [
    "TypeError: Cannot read properties of undefined (reading 'id')",
    "UnhandledPromiseRejection: Network request failed (timeout)",
    "Warning: Deprecated API usage detected in module 'auth'",
    "Error: Invalid state transition detected",
    "SecurityWarning: Suspicious action blocked",
    "RangeError: Maximum call stack size exceeded",
    "HTTP 502: Bad Gateway (upstream unavailable)",
    "DB::ConnectionError: too many connections",
    "AuthError: token expired or invalid",
    "Warning: rendering took too long (slow frame)",
    "Error: checksum mismatch (file corrupted?)",
    "Info: retrying request with backoff...",
    "Warn: rate limit approaching threshold",
    "Error: unexpected null in payload",
    "Warn: experimental feature flag enabled",
  ];

  const codes = ["E101", "E204", "W302", "E503", "W410", "I007", "E999"];

  return Array.from({ length: count }, (_, i) => {
    const level = pick(levels);
    const code = pick(codes);
    const ms = Math.floor(10 + Math.random() * 990);
    const ts = new Date(Date.now() - (count - i) * 120).toLocaleTimeString();

    return {
      id: `${i}-${Math.random().toString(16).slice(2)}`,
      level,
      text: `[${ts}] ${level} ${code} (${ms}ms) — ${pick(templates)}`,
    };
  });
}

function levelColor(level: LogLine["level"]) {
  switch (level) {
    case "ERROR":
      return "text-red-400";
    case "WARN":
      return "text-yellow-300";
    default:
      return "text-sky-300";
  }
}

export default function Level4({ onYes, onNo }: Props) {
  // ログ本文は固定（再レンダリングで変わらない）
  const logs = useMemo(() => makeLogs(70), []);

  // 「ブワッと」出すために、表示数を徐々に増やす
  const [visibleCount, setVisibleCount] = useState(0);

  // 追加で“警告っぽさ”を出す：はいにホバーすると小さく脅す
  const [hoverYes, setHoverYes] = useState(false);

  useEffect(() => {
    // 最初は一気に少し出して、その後パラパラ追加
    let n = 0;
    const firstBurst = 18;
    setVisibleCount(firstBurst);
    n = firstBurst;

    const id = window.setInterval(() => {
      n += 2;
      setVisibleCount((prev) => Math.min(logs.length, Math.max(prev, n)));
      if (n >= logs.length) window.clearInterval(id);
    }, 70);

    return () => window.clearInterval(id);
  }, [logs.length]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      {/* ちょい揺れ + フェード */}
      <div className="w-full max-w-2xl animate-pop">
        {/* ヘッダー */}
        <div className="mb-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1">
            <span className="text-red-300 animate-pulse">⚠</span>
            <span className="text-sm font-semibold text-red-200 tracking-wide">
              SYSTEM ALERT
            </span>
            <span className="text-xs text-red-200/70">(unstable)</span>
          </div>
        </div>

        {/* ログ（スクロール） */}
        <div className="relative rounded-2xl border border-white/10 bg-zinc-950/80 shadow-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm text-white/80">
                  エラーが検出されました。続行しますか？
                </p>
              </div>
              <div className="text-xs text-white/40">
                logs: {Math.min(visibleCount, logs.length)}/{logs.length}
              </div>
            </div>
          </div>

          <div className="h-[45vh] overflow-y-auto px-4 py-3 font-mono text-xs leading-relaxed">
            {logs.slice(0, visibleCount).map((l, idx) => (
              <div
                key={l.id}
                className={`whitespace-pre-wrap ${levelColor(l.level)} animate-line`}
                style={{
                  // ちょっとずつタイミングをずらして“ブワッと感”
                  animationDelay: `${Math.min(idx, 30) * 12}ms`,
                }}
              >
                {l.text}
              </div>
            ))}
          </div>

          {/* 下部の「ダイアログ」 */}
          <div className="border-t border-white/10 bg-zinc-950/60 px-4 py-4">
            <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/10 p-3">
              <p className="text-sm text-yellow-100 font-semibold">
                ⚠ 最終確認
              </p>
              <p className="text-xs text-yellow-100/70 mt-1">
                続行すると予期しない挙動が発生する可能性があります。
              </p>

              {hoverYes && (
                <div className="mt-2 text-xs text-red-200/80 animate-warn">
                  ⚠ 本当に続行しますか…？
                </div>
              )}

              <div className="mt-4 flex justify-center gap-4">
                <div
                  onMouseEnter={() => setHoverYes(true)}
                  onMouseLeave={() => setHoverYes(false)}
                >
                  <Button onClick={onYes}>はい</Button>
                </div>
                <Button onClick={onNo}>いいえ</Button>
              </div>
            </div>
          </div>

          {/* 画面の“ノイズ感” */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay">
            <div className="w-full h-full bg-[radial-gradient(circle_at_20%_10%,white,transparent_35%),radial-gradient(circle_at_80%_30%,white,transparent_30%),radial-gradient(circle_at_40%_90%,white,transparent_25%)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
