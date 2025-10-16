import { AnchorLinkOffset } from "@/components/ui/styled/anchor-link-offset";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { AnchorLink } from "@/features/anchor-link";
import { cx } from "@/utils/styling";

import { skillDetails } from "./data";

export function Scope() {
  return (
    <AnchorLinkOffset as={Container} id="対応領域">
      <section className="flex flex-col gap-10 border-t pt-8">
        <div className="group flex items-center gap-0.5">
          <Heading1>対応領域</Heading1>
          <AnchorLink
            href="#対応領域"
            className="sm:invisible sm:group-hover:visible"
          />
        </div>
        <div
          className={cx(
            "flex flex-col gap-6",
            "lg:grid lg:grid-cols-2 lg:gap-4",
          )}
        >
          {skillDetails.map((skillDetail) => (
            <div
              key={skillDetail.category}
              className={cx(
                "flex flex-col gap-4",
                "w-full",
                "px-7 py-6",
                "rounded-lg bg-stone-100",
              )}
            >
              <h4 className="flex items-end gap-2">
                <span className="font-bold">{skillDetail.category}</span>
                <span className="text-foreground-primary/80 text-sm">
                  / {skillDetail.kikan}
                </span>
              </h4>
              <ul className="flex flex-col gap-1.5">
                {skillDetail.items.map((item) => (
                  <li
                    key={item}
                    className={cx(
                      "bg-[0_0.12rem]",
                      "bg-[url('/assets/check-circle-fill-color-foreground.svg')]",
                      "bg-[length:18px_18px]",
                      "[background-position:0px_3px]",
                      "bg-no-repeat",
                      "ps-[1.75rem]",
                      "leading-[1.6]",
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </AnchorLinkOffset>
  );
}
