import Button from "../../components/Button";

type Props = {
  onBack: () => void;
};

export default function GameOver({ onBack }: Props) {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold text-red-600">ゲームオーバー</h1>
      <Button onClick={onBack}>最初から</Button>
    </div>
  );
}
