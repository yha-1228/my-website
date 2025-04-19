import { type ComponentPropsWithRef } from "react";

type ExternalLinkProps = Omit<ComponentPropsWithRef<"a">, "target" | "rel">;

function ExternalLink(props: ExternalLinkProps) {
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

export { ExternalLink, type ExternalLinkProps };
