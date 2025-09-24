import { cn } from "@/utils/styling";

export interface HtmlRendererProps {
  html: string;
  className?: string;
}

export function HtmlRenderer({ html, className }: HtmlRendererProps) {
  return (
    <div
      className={cn(
        "[&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:text-2xl [&>h2]:leading-tight [&>h2]:font-bold [&>h2]:first:mt-0",
        "[&>h3]:mt-6 [&>h3]:mb-4 [&>h3]:text-lg [&>h3]:leading-tight [&>h3]:font-bold [&>h3]:first:mt-0",
        "[&>p]:my-3",
        "[&_ul]:pl-6 [&_ul>li]:list-disc",
        "[&>hr]:text-base-light-200 [&>hr]:my-6 [&>hr]:border-y-2",
        "[&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-4 [&_a]:hover:decoration-2",
        cn(
          "[&>figure]:my-3",
          // これがないと崩れる
          "[&>figure]:flex [&>figure]:flex-col [&>figure]:items-center [&>figure]:overflow-hidden",
          "[&>figure>a]:hover:border-primary-700",
          "[&>figure>a]:hover:cursor-pointer",
          "[&>figure>a]:transition-colors",
          "[&>figure>a]:border-base-light-300 [&>figure>a]:border",
          "[&>figure>a]:rounded-md [&>figure>a]:p-4",
        ),
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
