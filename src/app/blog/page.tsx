import { type Metadata } from "next";

import { getZennArticles } from "@/api/endpoints/blog";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { SITE_TITLE } from "@/constants";
import { ContactLinkBanner } from "@/features/contact-link-banner";
import { routes } from "@/routes";

import { PageClient } from "./page.client";

/**
 * @example
 * ```ts
 * pick({foo:1, bar,2, buz: 3}, ["foo", "buz"])
 * // {foo:1, buz: 3}
 * ```
 */
function pick<T extends object, K extends keyof T>(
  o: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in o) {
      result[key] = o[key];
    }
  }
  return result;
}

export const metadata: Metadata = {
  title: `${routes.blog.label} | ${SITE_TITLE}`,
};

export const dynamic = "force-static";

export default async function Page() {
  const zennArticles = await getZennArticles();

  return (
    <div className="flex flex-col gap-20 pb-28">
      <div className="py-14">
        <Container className="md:max-w-(--breakpoint-md)">
          <section className="flex flex-col gap-10">
            <div className="text-center">
              <Heading1>{routes.blog.label}</Heading1>
            </div>

            <PageClient
              // そのまま渡すとServerComponentで解析できないpropsが含まれるので、絞り込む
              zennArticles={zennArticles.map((a) =>
                pick(a, ["isoDate", "guid", "link", "title"]),
              )}
              limit={8}
            />
          </section>
        </Container>
      </div>
      <ContactLinkBanner />
    </div>
  );
}
