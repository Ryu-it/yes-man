import Button from "../../components/Button";

type Props = { onYes: () => void; onNo: () => void };

export default function Level7({ onYes, onNo }: Props) {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">レベル7（最終）</h1>
      <p>最後です。続けますか？</p>

      <div className="flex justify-center gap-4">
        <Button onClick={onYes}>はい</Button>
        <Button onClick={onNo}>いいえ</Button>
      </div>
    </div>
  );
}
