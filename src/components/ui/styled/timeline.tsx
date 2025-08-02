import { type ReactNode } from "react";

export interface TimelineItem {
  point: string;
  heading: ReactNode;
  content?: ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} className="flex [&:last-child>*:nth-child(2)]:pb-0">
          {/* Dot + Axis */}
          <div className="flex shrink-0 flex-col items-center">
            {/* Dot */}
            <div className="border-primary-600 size-4 rounded-full border-4 border-solid bg-white" />
            {/* Axis */}
            <div className="bg-primary-600 h-full w-0.5" />
          </div>

          {/* Body */}
          <div className="ml-5 w-full pb-10">
            <div className="text-primary-600 leading-none font-semibold">
              {item.point}
            </div>

            <div className="border-t-base-light-300 mt-4 border-t border-solid pt-2">
              <div className="py-1 text-xl leading-snug font-bold">
                {item.heading}
              </div>
              {!!item.content && (
                <div className="text-base-foreground-weak mt-3 space-y-2.5 text-sm leading-[1.65]">
                  {item.content}
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
