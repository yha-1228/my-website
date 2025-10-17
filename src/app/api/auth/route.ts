import { SITE_TITLE } from "@/constants";
import { routes } from "@/routes";

const html = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ログイン失敗 | ${SITE_TITLE}</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 24px;
    }

    h1 {
      font-size: 24px;
    }
  </style>
  <link rel="icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-icon.png" />
</head>
<body>
  <main>
    <h1>ログインが中断されました</h1>
    <p>パスワードが間違えているか、変更されている可能性があります。</p>
    <a href="${routes.experience.href}">職務経歴一覧に戻る</a><br />
  </main>
</body>
</html>` as const;

export async function GET() {
  return new Response(html, {
    status: 401,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}
