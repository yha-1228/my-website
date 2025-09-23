export async function GET() {
  return new Response("ログインに失敗しました。前のページに戻ってください。", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}
