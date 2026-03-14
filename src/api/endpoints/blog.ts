import Parser from "rss-parser";
import { z } from "zod";

const parser = new Parser();

async function getZennArticles() {
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

async function getNoteArticles() {
  const url = "https://note.com/yhase_rqp/m/mcf7aab0b6b74/rss";
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

export async function getArticles() {
  const zennArticles = (await getZennArticles()).map((item) => ({
    ...item,
    type: "zenn" as const,
  }));
  const noteArticles = (await getNoteArticles()).map((item) => ({
    ...item,
    type: "note" as const,
  }));

  const sorted = [...zennArticles, ...noteArticles].sort((a, b) => {
    const aIsoDate = a.isoDate;
    const bIsoDate = b.isoDate;

    return bIsoDate.localeCompare(aIsoDate);
  });

  return sorted as Array<{
    type: "zenn" | "note";
    isoDate: string;
    guid: string;
    link: string;
    title: string;
  }>;
}

export type Article = Awaited<ReturnType<typeof getArticles>>[number];
