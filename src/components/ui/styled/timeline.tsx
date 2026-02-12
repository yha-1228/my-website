import { type ReactNode } from "react";

import { cn } from "@/utils/styling";

export interface TimelineItem {
  point: ReactNode;
  heading?: ReactNode;
  subHeading?: ReactNode;
  content?: ReactNode;
}

type ColorSchema = "brand" | "neutral";

const borderColorClassNames = {
  brand: "border-brand-base",
  neutral: "border-foreground-primary",
} as const satisfies Record<ColorSchema, string>;

const pointColorClassNames = {
  brand: "text-brand-base",
  neutral: "text-foreground-primary",
} as const satisfies Record<ColorSchema, string>;

export interface TimelineProps {
  items?: TimelineItem[];
  /**
   * @default "brand"
   */
  colorSchema?: ColorSchema;
  bodyClassName?: string;
  /**
   * @default true
   */
  hasBorderEachBody?: boolean;
}

export function Timeline({
  items,
  colorSchema = "brand",
  bodyClassName,
  hasBorderEachBody = true,
}: TimelineProps) {
  if (!items) return null;

  return (
    <ul>
      {items.map((item, index) => {
        const pointOnly = !item.heading && !item.subHeading && !item.content;
        const hasHeading = !!item.heading && !!item.subHeading;

        return (
          <li key={index} className="flex [&:last-child>*:nth-child(2)]:pb-0">
            {/* Dot + Axis */}
            <div className="flex shrink-0 flex-col items-center">
              {/* Dot */}
              <div
                className={cn(
                  borderColorClassNames[colorSchema],
                  "size-4 shrink-0 rounded-full border-4 border-solid bg-white",
                )}
              />
              {/* Axis */}
              <div className="h-full w-0.5 bg-stone-300" />
            </div>

            {/* Body */}
            <div className={cn("ml-5 w-full pb-12", bodyClassName)}>
              <div
                className={cn(
                  pointColorClassNames[colorSchema],
                  "leading-none",
                )}
              >
                {item.point}
              </div>

              <div
                className={cn(
                  "mt-4 flex flex-col gap-4",
                  hasBorderEachBody &&
                    "border-t border-solid border-t-gray-300 pt-2",
                )}
                hidden={pointOnly}
              >
                {hasHeading && (
                  <div className="flex flex-col">
                    {item.heading && (
                      <div className="pt-2 text-lg leading-snug font-bold sm:text-2xl">
                        {item.heading}
                      </div>
                    )}
                    {item.subHeading && (
                      <div className="mt-2 text-base sm:text-lg">
                        {item.subHeading}
                      </div>
                    )}
                  </div>
                )}

                {item.content}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
