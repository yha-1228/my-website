import { MAIN_CONTENT_ID } from "@/constants";
import { clsx } from "@/utils/css/clsx";
import { Container } from "../ui/styled/container";
import {
  TabOnlySkipContainer,
  TabOnlySkipLink,
} from "../ui/unstyled/tab-only-skip";

export function SkipToMainContent() {
  return (
    <TabOnlySkipContainer className="bg-primary-600 py-2 text-white">
      <Container>
        <TabOnlySkipLink
          hrefId={MAIN_CONTENT_ID}
          className={clsx(
            "inline-block py-1 font-bold underline underline-offset-[0.15em]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-300",
          )}
        >
          メインコンテンツにスキップ
        </TabOnlySkipLink>
      </Container>
    </TabOnlySkipContainer>
  );
}
