import Link from "next/link";

import { ArrowRight } from "@/assets/arrow-right";
import { Container } from "@/components/ui/styled/container";
import { routes } from "@/routes";

export function ContactLinkBanner() {
  return (
    <div className="py-8 sm:pt-12">
      <Container>
        <div className="rounded-xl bg-primary-800 p-6 text-center text-white sm:flex sm:items-center sm:justify-between sm:px-10 sm:py-8 sm:text-left">
          <div className="">
            <h1 className="text-2xl font-bold sm:text-3xl">お問い合わせ</h1>
            <p className="mt-0.5">お気軽にお問い合わせください。</p>
          </div>
          <Link
            className="group mt-6 inline-block w-full rounded-md bg-white py-2 text-lg font-bold text-primary-800 hover:underline hover:decoration-2 hover:underline-offset-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-100/70 sm:flex sm:w-auto sm:px-8 sm:py-4"
            href={routes.contact.href}
          >
            <span>フォームを開く</span>
            <span className="hidden sm:ml-1.5 sm:flex sm:items-center sm:transition-transform sm:duration-300 sm:group-hover:translate-x-1 sm:motion-reduce:transform-none">
              <ArrowRight className="stroke-[currentColor]" />
            </span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
