import Button from "../../components/Button";

type Props = {
  onBack: () => void;
};

export default function GameClear({ onBack }: Props) {
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    "あなたは真のYes-manです。"
  )}&url=${encodeURIComponent(window.location.href)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-end pb-12 gap-4"
      style={{
        backgroundImage: "url(/images/final-message.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <a
        href={shareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-6 py-3 rounded bg-black text-white font-semibold"
      >
        Xでシェア
      </a>

      <Button onClick={onBack}>最初に戻る</Button>
    </div>
  );
}
