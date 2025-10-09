import { type ReactNode } from "react";

import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { cn } from "@/utils/styling";

import { skillDetails } from "./data";

interface AboutListProps {
  heading: string;
  items: ReactNode[];
  className?: string;
}

export function AboutList(props: AboutListProps) {
  const { heading, items, className } = props;
  const [headingMain, headingSub] = heading.split(" / ");

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        "w-full",
        "px-7 py-6",
        "rounded-lg bg-stone-100",
        className,
      )}
    >
      <h4 className="flex items-end gap-2">
        <span className="font-bold">{headingMain}</span>
        <span className="text-foreground-primary/80 text-sm">
          / {headingSub}
        </span>
      </h4>
      <ul className="flex flex-col gap-1.5">
        {items.map((item, index) => (
          <li
            key={index}
            className={cn(
              "bg-[0_0.12rem]",
              "bg-[url('/assets/check-circle-fill-color-foreground.svg')] bg-[length:18px_18px] [background-position:0px_3px] bg-no-repeat ps-[1.75rem]",
              "leading-[1.6]",
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Scope() {
  return (
    <Container>
      <section className="flex flex-col gap-10 border-t pt-8">
        <Heading1>対応領域</Heading1>
        <div
          className={cn(
            "flex flex-col gap-6",
            "lg:grid lg:grid-cols-2 lg:gap-4",
          )}
        >
          {skillDetails.map((skillDetail) => (
            <AboutList
              key={skillDetail.category}
              heading={skillDetail.category}
              items={skillDetail.items}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
