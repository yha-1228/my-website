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
        "[&>table_tr]:border-t-base-light-400 [&>table_tr]:border-t [&>table_tr]:first:border-t-0",
        "[&>table_th]:py-8 [&>table_th]:pr-6 [&>table_th]:text-left [&>table_th]:align-top [&>table_th]:text-lg [&>table_th]:leading-tight [&>table_th]:font-bold [&>table_th]:whitespace-nowrap md:[&>table_th]:text-2xl",
        "[&>table_td]:py-8 [&>table_td]:pr-6",
        "[&>figure]:border-base-light-300 [&>figure]:hover:border-base-foreground [&>figure]:overflow-hidden [&>figure]:rounded-md [&>figure]:border",
        "[&>figure>figcaption]:pt-3 [&>figure>figcaption]:pb-4 [&>figure>figcaption]:text-center [&>figure>figcaption]:text-sm [&>figure>figcaption]:font-bold [&>figure>figcaption]:hover:cursor-pointer",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
