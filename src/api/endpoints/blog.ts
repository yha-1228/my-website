import Parser from "rss-parser";

const parser = new Parser();

export async function getZennArticles() {
  const url = "https://zenn.dev/yhase_rqp/feed?all=1";
  const feed = await parser.parseURL(url);
  return feed.items;
}
