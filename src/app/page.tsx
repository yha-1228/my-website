import { Blog } from "./_blog";
import { ContactLinkBanner } from "./_contact-link-banner";
import { HeroHeader } from "./_hero-header";
import { Langs } from "./_langs";
import { Scope } from "./_scope";

export default function Page() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <HeroHeader />
      <Blog />
      <Scope />
      <Langs />
      <ContactLinkBanner />
    </div>
  );
}
