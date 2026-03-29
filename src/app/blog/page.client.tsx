"use client";

import { ExternalLink } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { type Article } from "@/api/endpoints/blog";
import {
  getOffsetIndex,
  Pagination,
  parsePaginationSearchParams,
} from "@/components/ui/styled/pagination";
import { dateFormat } from "@/features/blog/date";
import { Tag } from "@/features/blog/tag";
import { cx } from "@/utils/styling";

function paginate<T>(
  array: T[],
  { offset, limit }: { offset: number; limit: number },
) {
  return {
    totalCount: array.length,
    items: array
      .filter((_, index) => index >= offset)
      .filter((_, index) => index <= limit - 1),
  };
}

export function PageClient({
  articles,
  limit,
}: {
  articles: Article[];
  limit: number;
}) {
  const searchParams = useSearchParams();
  const parsedSearchParams = parsePaginationSearchParams(searchParams);

  const paginatedArticles = paginate(articles, {
    offset: getOffsetIndex(parsedSearchParams.page, limit),
    limit,
  });

  if (paginatedArticles.totalCount === 0) {
    return null;
  }

  if (paginatedArticles.items.length === 0) {
    // TODO: add empty view
    return null;
  }

  return (
    <div className="flex flex-col gap-10">
      <ul className="flex flex-col gap-10">
        {paginatedArticles.items.map((article) => (
          <li
            className="flex flex-col gap-4 border-b border-b-stone-300 pb-6"
            key={article.guid}
          >
            <p className="text-foreground-secondary text-sm">
              {dateFormat("yyyy年MM月dd日 HH:mm", article.isoDate)}
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={article.link}
              className={cx(
                "flex items-start gap-x-2",
                "hover:text-brand-base active:text-brand-base",
              )}
            >
              <div className="text-xl font-bold">{article.title}</div>
              <ExternalLink className="mt-1 shrink-0" />
            </a>

            <div>
              <Tag variant={article.type} />
            </div>
          </li>
        ))}
      </ul>

      <Pagination totalCount={paginatedArticles.totalCount} perPage={limit} />
    </div>
  );
}
