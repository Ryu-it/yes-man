import Button from "../../components/Button";

type Props = {
  title: string;
  message: string;
  shareUrl: string;
  onBack: () => void;
};

export default function GameOver({ title, message, shareUrl, onBack }: Props) {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold text-red-600">{title}</h1>

      <p className="text-base">{message}</p>

      <div className="flex justify-center gap-3">
        <a
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 rounded bg-black text-white"
        >
          Xでシェア
        </a>

        <Button onClick={onBack}>最初から</Button>
      </div>
    </div>
  );
}
