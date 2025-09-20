export async function GET() {
  return new Response("ログインに失敗しました。", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}
