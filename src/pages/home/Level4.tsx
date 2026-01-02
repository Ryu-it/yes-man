import Button from "../../components/Button";

type Props = { onYes: () => void; onNo: () => void };

export default function Level4({ onYes, onNo }: Props) {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">レベル4</h1>
      <p>次へ進みますか？</p>

      <div className="flex justify-center gap-4">
        <Button onClick={onYes}>はい</Button>
        <Button onClick={onNo}>いいえ</Button>
      </div>
    </div>
  );
}
