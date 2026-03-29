import { type ReactNode } from "react";

import { cn } from "@/utils/styling";

import { LogoutBanner } from "../auth/logout-banner";
import { ContactLinkBanner } from "../contact-link-banner";
import { Footer } from "./footer";
import { Header } from "./header";
import { MainArea } from "./main-area";

export interface BaseTemplateProps {
  children: ReactNode;
  insertLogoutBanner?: boolean;
  hasContactBanner?: boolean;
  contentWrapperClassName?: string;
}

export function BaseTemplate({
  children,
  insertLogoutBanner,
  hasContactBanner,
  contentWrapperClassName,
}: BaseTemplateProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <MainArea>
        {insertLogoutBanner && <LogoutBanner />}
        <div
          className={cn(
            "flex flex-col gap-20 pt-14 pb-20",
            contentWrapperClassName,
          )}
        >
          {children}
          {hasContactBanner && <ContactLinkBanner />}
        </div>
      </MainArea>
      <Footer className="mt-auto" />
    </div>
  );
}
