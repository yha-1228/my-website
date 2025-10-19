"use client";

import Link from "next/link";
import {
  type ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { z } from "zod";

import { Button } from "./button";

function range(start: number, end: number): number[] {
  return [...Array(end - start + 1)].map((_, i) => start + i);
}

function parseSearchParams(searchParams: ReadonlyURLSearchParams) {
  // 整数の文字列
  const pageSchema = z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine(Number.isInteger);

  const pageParam = searchParams.get("page");
  const pageParamParseResult = pageSchema.safeParse(pageParam);

  return {
    page: pageParamParseResult.success ? pageParamParseResult.data : 1,
  };
}

export { parseSearchParams as parsePaginationSearchParams };

export function getOffsetIndex(page: number, limit: number) {
  return (page - 1) * limit;
}

export interface PaginationProps {
  totalCount: number;
  perPage: number;
}

export function Pagination({ totalCount, perPage }: PaginationProps) {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const parsedSearchParams = parseSearchParams(searchParams);
  const activePage = parsedSearchParams.page;

  const start = getOffsetIndex(activePage, perPage) + 1;
  const end = Math.min(activePage * perPage, totalCount);

  if (totalCount === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-between">
      <ul className="flex gap-2">
        {range(1, Math.ceil(totalCount / perPage)).map((page) => (
          <li key={page}>
            <Button
              as={Link}
              variant={page === activePage ? "fill" : "outline"}
              className="size-10"
              href={`${pathname}?page=${page}`}
            >
              {page}
            </Button>
          </li>
        ))}
      </ul>

      <p className="text-foreground-secondary">{`${start} - ${end} / ${totalCount}行`}</p>
    </div>
  );
}
