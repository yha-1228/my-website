"use client";

import { ExternalLink } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { type ZennArticle } from "@/api/endpoints/blog";
import {
  Pagination,
  parsePaginationSearchParams,
} from "@/components/ui/styled/pagination";
import { dateFormat, isWithinOneMonth } from "@/features/blog/date";
import { Tag } from "@/features/blog/tag";
import { routes } from "@/routes";
import { cn } from "@/utils/styling";

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
  zennArticles,
  limit,
}: {
  zennArticles: ZennArticle[];
  limit: number;
}) {
  const searchParams = useSearchParams();
  const parsedSearchParams = parsePaginationSearchParams(searchParams);

  const paginatedZennArticles = paginate(zennArticles, {
    offset: (parsedSearchParams.page - 1) * limit,
    limit,
  });

  if (paginatedZennArticles.totalCount === 0) {
    return null;
  }

  if (paginatedZennArticles.items.length === 0) {
    // TODO: add empty view
    return null;
  }

  return (
    <>
      <ul className="flex flex-col gap-10">
        {paginatedZennArticles.items.map((zennArticle) => {
          if (!zennArticle.isoDate) return null;

          return (
            <li
              className="flex flex-col gap-4 border-b border-b-stone-300 pb-6"
              key={zennArticle.guid}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={zennArticle.link}
                className="group"
              >
                <p className="text-foreground-secondary text-sm">
                  {dateFormat("yyyy年MM月dd日 HH:mm", zennArticle.isoDate)}
                </p>
                <div
                  className={cn(
                    "flex items-start gap-x-2",
                    "group-hover:text-brand-base group-active:text-brand-base",
                  )}
                >
                  <div className="text-xl font-bold">{zennArticle.title}</div>
                  <ExternalLink className="mt-1 shrink-0" />
                </div>
              </a>

              <div className="flex gap-2">
                <Tag variant="zenn">Zenn</Tag>
                {isWithinOneMonth(zennArticle.isoDate) && (
                  <Tag variant="withinOneMonth">1ヶ月以内に投稿</Tag>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <Pagination
        totalCount={paginatedZennArticles.totalCount}
        perPage={limit}
        pathname={routes.blog.href}
      />
    </>
  );
}
