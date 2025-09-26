import Link from "next/link";

import { ArrowRight } from "@/assets/arrow-right";
import { Container } from "@/components/ui/styled/container";
import { routes } from "@/routes";
import { cn } from "@/utils/styling";

export function ContactLinkBanner() {
  return (
    <div className="py-8 sm:pt-12">
      <Container>
        <Link
          href={routes.contact.href}
          className="bg-brand-base group hover:not-disabled:bg-brand-hover active:not-disabled:bg-brand-active block rounded-xl p-6 text-center text-white transition-colors sm:flex sm:items-center sm:justify-between sm:px-10 sm:py-8 sm:text-left"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl">お問い合わせ</h1>
            <p className="mt-0.5">お気軽にお問い合わせください。</p>
          </div>
          <div
            className={cn(
              "mt-6 inline-block w-full rounded-md border border-white py-2 text-lg font-bold text-white transition-colors sm:flex sm:w-auto sm:px-8 sm:py-4",
              "group-hover:text-brand-hover group-active:text-brand-active group-hover:bg-white",
            )}
          >
            <span>フォームを開く</span>
            <span className="hidden sm:ml-1.5 sm:flex sm:items-center sm:transition-transform sm:duration-300 sm:group-hover:translate-x-1.5 sm:motion-reduce:transform-none">
              <ArrowRight className="stroke-[currentColor]" />
            </span>
          </div>
        </Link>
      </Container>
    </div>
  );
}
