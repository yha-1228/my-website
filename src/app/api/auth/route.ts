import { SITE_TITLE } from "@/constants";
import { routes } from "@/routes";

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

    h1 {
      font-size: 24px;
    }
  </style>
  <link rel="icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-icon.png" />
</head>
<body>
  <main class="p-20">
    <h1>ログインが中断されました</h1>
    <div class="a-wrap">
      <a href="${routes.index.href}">ホーム画面に戻る</a><br />
      <a href="${routes.portfolio.href}">もう一度ログインする</a>
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
