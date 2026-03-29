import { BaseTemplate } from "@/features/template/base-template";

import { Blog } from "./_blog";
import { Detail } from "./_details";
import { HeroHeader } from "./_hero-header";
import { Langs } from "./_langs";
import { Scope } from "./_scope";

export default function Page() {
  return (
    <BaseTemplate hasContactBanner contentWrapperClassName="pt-0">
      <HeroHeader />
      <Blog />
      <Scope />
      <Langs />
      <Detail />
    </BaseTemplate>
  );
}
