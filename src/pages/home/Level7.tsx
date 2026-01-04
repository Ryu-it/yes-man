import Button from "../../components/Button";

type Props = {
  onYes: () => void;
  onNo: () => void;
};

export default function Level7({ onYes, onNo }: Props) {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-3xl font-bold">レベル7（最終）</h1>
      <p>ここには何もありません。</p>

      {/* 表示されている「いいえ」 */}
      <div className="flex justify-center">
        <Button onClick={onNo}>いいえ</Button>
      </div>

      {/* 🔒 隠された「はい」ボタン */}
      <div
        id="secret-yes-wrapper"
        style={{ display: "none" }}
      >
        <Button onClick={onYes}>はい</Button>
      </div>
    </div>
  );
}
