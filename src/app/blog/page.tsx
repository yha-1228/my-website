import Link from 'next/link';
import Container from '@/components/ui/styled/container';
import Heading1 from '@/components/ui/styled/heading1';
import Tag from '@/components/ui/styled/tag';
import { getBlogListResponse } from '@/lib/microcms/client';
import { routes } from '@/routes';
import { formatISODate } from '@/utils/date/formatter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ブログ',
};

export default async function Page() {
  const { contents } = await getBlogListResponse();

  return (
    <div className="py-14">
      <Container>
        <section className="space-y-6">
          <Heading1>ブログ</Heading1>
          <ul className="space-y-4">
            {contents.map((content) => (
              <li key={content.id}>
                <Link
                  href={routes.blog.routes[':id'].generateHref(content.id)}
                  className="group block rounded-md border border-solid border-gray-light-300 px-5 py-4 transition-colors duration-200 ease-out active:border-gray-foreground"
                >
                  <div className="text-xl font-bold text-gray-foreground-weak underline-offset-[0.18em] group-hover:text-gray-foreground">
                    {content.title}
                  </div>
                  <p className="text-sm text-gray-foreground-weak">
                    {formatISODate(content.publishedAt)}に投稿
                  </p>
                  <Tag className="mt-5">{content.tag.tagName}</Tag>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  );
}
