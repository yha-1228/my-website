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
        "[&>p]:my-3",
        "[&_ul]:pl-6 [&_ul>li]:list-disc",
        "[&>hr]:text-base-light-200 [&>hr]:my-6 [&>hr]:border-y-2",
        "[&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-4 [&_a]:hover:decoration-2",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
