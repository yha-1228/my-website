"use client";

import Link from "next/link";
import { type ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
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

export interface PaginationProps {
  totalCount: number;
  perPage: number;
  rootClassName?: string;
  pathname: string;
}

export function Pagination({ totalCount, perPage, pathname }: PaginationProps) {
  const searchParams = useSearchParams();
  const parsedSearchParams = parseSearchParams(searchParams);
  const activePage = parsedSearchParams.page;

  const start = (activePage - 1) * perPage + 1;
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
