import Button from "../../components/Button";

type Props = {
  onBack: () => void;
};

export default function Level2({ onBack }: Props) {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">レベル2に進みました。</h1>
      <Button onClick={onBack}>戻る</Button>
    </div>
  );
}
