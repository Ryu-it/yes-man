export type LevelKey = "level2" | "level3" | "level4" | "level5" | "level6" | "level7";

export type GameOverConfig = {
  title: string;
  message: string;
  shareText: (params: { level: LevelKey }) => string;
};

export const GAME_OVER_CONFIG: Record<LevelKey, GameOverConfig> = {
  level2: {
    title: "ゲームオーバー（Level 2）",
    message: "真のYes-manになりたければ、何も考えずに“はい”を押せばいいんです",
    shareText: ({ level }) => `Yes-Manで${level}で敗北…！もう一回やるぞ🔥`,
  },
  level3: {
    title: "ゲームオーバー（Level 3）",
    message: "はいだって逃げますよ",
    shareText: ({ level }) => `Yes-Man ${level}で散った…判断ミスった😂`,
  },
  level4: {
    title: "ゲームオーバー（Level 4）",
    message: "はいを押す勇気がないか",
    shareText: ({ level }) => `Yes-Man ${level}で撃沈。次は勝つ。`,
  },
  level5: {
    title: "ゲームオーバー（Level 5）",
    message: "何も考えずにはいを押すのがyes-manの一歩目ですよ",
    shareText: ({ level }) => `Yes-Man ${level}で終了。メンタル修行してくる。`,
  },
  level6: {
    title: "ゲームオーバー（Level 6）",
    message: "頑張りました",
    shareText: ({ level }) => `Yes-Man ${level}で限界。熱い戦いだった。`,
  },
  level7: {
    title: "ゲームオーバー（Level 7）",
    message: "はいが見つけられないようじゃダメか、はいはね、見つけないと",
    shareText: ({ level }) => `Yes-Man ${level}で最後に散る…リベンジ確定。`,
  },
};
