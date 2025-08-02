import { type ReactNode } from "react";
import { createPortal } from "react-dom";

import { useIsClient } from "@/hooks/use-is-client";

interface SafetyPortalProps {
  children: ReactNode;
}

function SafetyPortal(props: SafetyPortalProps) {
  const { children } = props;
  const isClient = useIsClient();

  return <>{isClient && createPortal(children, document.body)}</>;
}

export { SafetyPortal };
