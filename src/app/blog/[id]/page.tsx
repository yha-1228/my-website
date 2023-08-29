import { Metadata } from 'next';
import { BsChevronLeft } from 'react-icons/bs';
import Container from '@/components/ui/container';
import Heading1 from '@/components/ui/heading1';
import Tag from '@/components/ui/tag';
import { TextLink } from '@/components/ui/text-link';
import { getBlogContent, getBlogContents } from '@/lib/microcms/client';
import { GenerateMetadataProps, NextPageProps } from '@/lib/next/types';
import { routes } from '@/routes';
import clsx from '@/utils/css/clsx';
import { formatISODate } from '@/utils/date/formatter';

export async function generateMetadata({
  params,
}: GenerateMetadataProps<'id'>): Promise<Metadata> {
  const { id } = params;
  const blogContent = await getBlogContent(id);

  return {
    title: blogContent.title,
  };
}

export async function generateStaticParams() {
  const { contents } = await getBlogContents();
  return contents.map((content) => ({ id: content.id }));
}

export default async function Page({ params }: NextPageProps<'id'>) {
  const { id } = params;
  const content = await getBlogContent(id);

  return (
    <div className="py-8">
      <Container>
        <TextLink
          href={routes.blog.href}
          className="inline-flex items-center space-x-1"
        >
          <BsChevronLeft />
          <span>戻る</span>
        </TextLink>

        <article className="mt-8">
          <Heading1>{content.title}</Heading1>
          <p className="mt-2 text-gray-foreground-weak">
            {formatISODate(content.publishedAt)}に投稿
          </p>
          <div className="mt-8 md:rounded-xl md:border md:border-solid md:border-gray-light-300 md:p-10">
            <Tag>{content.tag.tagName}</Tag>
            <div
              className={clsx(
                'mt-6',
                '[&>h1]:text-3xl [&>h1]:mt-10 [&>h1]:mb-5',
                '[&>h2]:text-2xl [&>h2]:mt-10 [&>h2]:mb-4',
                '[&>p]:my-4',
                '[&>ul]:pl-9',
                '[&>ul>li]:list-disc',
              )}
              dangerouslySetInnerHTML={{
                __html: `${content.body}`,
              }}
            />
          </div>
        </article>
      </Container>
    </div>
  );
}
