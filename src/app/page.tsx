import { ContactLinkBanner } from "@/features/contact-link-banner";

import { Blog } from "./_blog";
import { Detail } from "./_details";
import { HeroHeader } from "./_hero-header";
import { Langs } from "./_langs";
import { Scope } from "./_scope";

export default function Page() {
  return (
    <div className="flex flex-col gap-20 pb-28">
      <HeroHeader />
      <Blog />
      <Scope />
      <Langs />
      <Detail />
      <ContactLinkBanner />
    </div>
  );
}
