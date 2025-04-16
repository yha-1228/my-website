import { type ReactNode } from "react";

import { useIsClient } from "@/hooks/use-is-client";

interface IsClientProps {
  children: ({ isClient }: { isClient: boolean }) => ReactNode;
}

function IsClient(props: IsClientProps) {
  const { children } = props;
  const isClient = useIsClient();

  return <>{children({ isClient })}</>;
}

export { IsClient };
export type { IsClientProps };
