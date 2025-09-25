import { SITE_TITLE } from "@/constants";

const html = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>認証エラー | ${SITE_TITLE}</title>
  <style>
    body {
      font-family: sans-serif;
    }

    .p-20 {
      padding: 20px;
    }
  </style>
  <link rel="icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-icon.png" />
</head>
<body>
  <main class="p-20">
    <h1>認証に失敗しました</h1>
    <div>
      <a href="/">ホーム画面に戻る</a><br />
      <a href="/portfolio">もう一度ログインする</a>
    </div>
  </main>
</body>
</html>`;

export async function GET() {
  return new Response(html, {
    status: 401,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}
