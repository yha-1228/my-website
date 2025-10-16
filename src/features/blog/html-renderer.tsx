import { cn, cx } from "@/utils/styling";

const baseClassName = cx(
  "[&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:text-2xl [&>h2]:leading-tight [&>h2]:font-bold [&>h2]:first:mt-0",
  "[&>h3]:mt-6 [&>h3]:mb-4 [&>h3]:text-lg [&>h3]:leading-tight [&>h3]:font-bold [&>h3]:first:mt-0",
  "[&>p]:my-4 [&>p]:first:mt-0",
  "[&_ul]:pl-5 [&_ul>li]:list-disc",
  "[&>hr]:my-6 [&>hr]:border-y-2 [&>hr]:text-stone-200",
  "[&_a]:decoration-brand-base [&_a]:text-brand-base [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-4 [&_a]:hover:decoration-2 [&_a]:active:decoration-2",

  cx(
    "[&>figure]:my-4",
    // これがないと崩れる
    "[&>figure]:flex [&>figure]:flex-col [&>figure]:items-center [&>figure]:overflow-hidden",
    "[&>figure>a]:hover:border-brand-base",
    "[&>figure>a]:hover:cursor-pointer",
    "[&>figure>a]:transition-colors",
    "[&>figure>a]:border [&>figure>a]:border-stone-300",
    "[&>figure>a]:rounded-md [&>figure>a]:p-4",
  ),
);

/**
 * - 変換前: `<p>[details:start(summary=Open Here)]</p><p>lorem ipsum.</p><p>foo bar buz.</p><p>[details:end]</p>`
 * - 変換後: `<details><summary>Open Here</summary><p>lorem ipsum.</p><p>foo bar buz.</p>[details:end]</details>`
 */
function convertToDetailBlocks(html: string) {
  const pattern =
    /<p>\[details:start\(summary=(.*?)\)\]<\/p>([\s\S]*?)<p>\[details:end\]<\/p>/g;

  return html.replace(pattern, (_, summary, content) => {
    summary = summary.trim();
    return `
    <details class="${cn("rounded-md border border-stone-300 overflow-hidden")}">
      <summary class="${cn("px-4 py-2 bg-stone-100 hover:opacity-70 active:opacity-70 transition-opacity cursor-pointer")}">${summary}</summary>
      <div class="${cn(baseClassName, "p-4")}">${content}</div>
    </details>`;
  });
}

export interface HtmlRendererProps {
  html: string;
  className?: string;
}

export function HtmlRenderer({ html, className }: HtmlRendererProps) {
  html = convertToDetailBlocks(html);

  return (
    <div
      className={cn(baseClassName, className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
