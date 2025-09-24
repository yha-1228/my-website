import { SITE_TITLE } from "@/constants";

function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "/";
  }
}

function reload() {
  window.location.reload();
}

const html = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>認証エラー | ${SITE_TITLE}</title>
  <style>
    .p-80 {
      padding: 80px;
    }
  </style>
  <link rel="icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-icon.png" />
  <meta name="description" content="認証に失敗しました" />
  <script>
    ${goBack.toString()}
    ${reload.toString()}
  </script>
</head>
<body>
  <main class="p-80">
    <h1>認証に失敗しました</h1>
    <p>ユーザー名またはパスワードが正しくありません。もう一度お試しください。<br>
      不明な場合は、ご担当者または長谷川にお問い合わせください。</p>
    <div>
      <button onclick="${goBack.name}()">ホーム画面に戻る</button>
      <button onclick="${reload.name}()">もう一度ログインする</button>
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
