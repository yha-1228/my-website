import Image from "next/image";
import { ButtonLink } from "@/components/ui/styled/button";
import { Container } from "@/components/ui/styled/container";
import { routes } from "@/routes";

export function HeroHeader() {
  return (
    <div className="pb-12 pt-10">
      <Container>
        <h1 className="text-2xl font-bold leading-[1.35] lg:text-4xl">
          Lorem, ipsum dolor.
        </h1>
        <div className="mt-3.5">
          <p className="text-gray-foreground-weak lg:text-lg">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            quaerat
          </p>
        </div>

        <ButtonLink
          href={routes.experience.href}
          className="group mt-8 flex items-center lg:inline-flex lg:items-center lg:px-6 lg:py-2 lg:text-lg"
        >
          <span>職務経歴を見る</span>
          <span className="ml-1 inline-block lg:ml-1.5 lg:transition-transform lg:duration-300 lg:group-hover:translate-x-1 lg:motion-reduce:transform-none">
            <Image
              src="/assets/arrow-right-white.svg"
              alt=""
              width={16}
              height={16}
            />
          </span>
        </ButtonLink>
      </Container>
    </div>
  );
}
