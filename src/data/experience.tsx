type Item = {
  company: string;
  kikan: string;
  experiences: Array<{
    kikan: string;
    title: string;
    description?: React.ReactNode;
  }>;
};

export const items: Item[] = [
  {
    company: 'システム開発会社',
    kikan: '2019/04 - 2023/08',
    experiences: [
      {
        kikan: '2022/05 - 2023/07',
        title: 'SFAツールの開発',
        description: (
          <>
            <p>
              大手食品メーカーに向けSFAツールの新規開発案件にフロントエンド開発メンバーとして参画。
            </p>
            <p>
              某大手食品メーカーに向けたSFA(営業支援)ツールの新規開発案件に参画。バックエンドは既存のモノリシックなCRMシステムをAPI化し、フロントエンドはUIを1から刷新することで開発が進められた。
            </p>
          </>
        ),
      },
      {
        kikan: '2020/12 - 2022/05',
        title: '請求書管理アプリの開発',
        description: (
          <>
            <p>
              インボイス制度対応のため、医療業界向けの請求書管理ツール開発案件に開発メンバーとして参画。
            </p>
            <p>
              特定の医療器具業界は紙で請求書を管理していたが、インボイス制度の施行に伴い基準を満たす請求書をデジタルで管理することが必要になり、Webアプリの新規開発が確定。
            </p>
          </>
        ),
      },
      {
        kikan: '2020/08 - 2020/11',
        title: '勤怠・締め日管理アプリの開発',
        description: (
          <>
            <p>
              インフラ業界向け勤怠管理ツール開発案件に開発メンバー・テスターとして参画。
            </p>
            <p>
              勤怠管理と締め日の管理を行う小規模なWebアプリ。また、簡素なSQL生成ツールも付属する。
            </p>
          </>
        ),
      },
      {
        kikan: '2020/05 - 2020/06',
        title: '以下と同様',
      },
      {
        kikan: '2019/07 - 2020/01',
        title: '建物維持管理アプリの保守',
        description: (
          <>
            <p>
              建設業界の建物維持アプリの保守案件に、バグ調査・テスター・開発を行う保守中心のメンバーとして参画。
            </p>
            <p>
              設備管理企業の従業員が建物の点検作業に使う、WebブラウザとWindowsの両方に対応するアプリケーションの保守作業。Web版の担当だが、Windows版の担当者も交えて保守とテストを中心に参画し、一部開発も実施した。
            </p>
          </>
        ),
      },
    ],
  },
];
