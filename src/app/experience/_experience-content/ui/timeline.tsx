import { type ReactNode } from "react";

export interface TimelineItem {
  point: ReactNode;
  heading: ReactNode;
  subHeading: ReactNode;
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
            <div className="border-brand-base size-4 rounded-full border-4 border-solid bg-white" />
            {/* Axis */}
            <div className="h-full w-0.5 bg-stone-300" />
          </div>

          {/* Body */}
          <div className="ml-5 w-full pb-12">
            <div className="text-brand-base leading-none">{item.point}</div>

            <div className="mt-4 flex flex-col gap-4 border-t border-solid border-t-gray-300 pt-2">
              <div className="flex flex-col">
                <div className="pt-2 text-lg leading-snug font-bold sm:text-2xl">
                  {item.heading}
                </div>
                <div className="mt-2 text-base sm:text-lg">
                  {item.subHeading}
                </div>
              </div>

              {item.content}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
