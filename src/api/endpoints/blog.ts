import Parser from "rss-parser";
import { z } from "zod";

const parser = new Parser();

export async function getZennArticles() {
  const url = "https://zenn.dev/yhase_rqp/feed?all=1";
  const feed = await parser.parseURL(url);

  const schema = z.array(
    z.object({
      isoDate: z.string(),
      guid: z.string(),
      link: z.string(),
      title: z.string(),
    }),
  );

  return schema.parse(feed.items);
}

export type ZennArticle = Awaited<ReturnType<typeof getZennArticles>>[number];
