import { cn } from "@/utils/styling";

export function HtmlRenderer({ html }: { html: string }) {
  return (
    <div
      className={cn(
        "pt-4",
        "[&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:text-2xl [&>h2]:leading-tight [&>h2]:font-bold",
        "[&>p]:my-5",
        "[&>ul]:pl-9",
        "[&>ul>li]:list-disc",
        "[&>hr]:text-base-light-200 [&>hr]:my-6 [&>hr]:border-y-2",
      )}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}
