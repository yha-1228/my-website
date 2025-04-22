import { Children, type ReactNode } from "react";

interface SplitNodeProps {
  children: ReactNode;
  separator: ReactNode;
}

function SplitNode({ children, separator }: SplitNodeProps) {
  return (
    <>
      {Children.map(children, (child, index) => {
        if (index === 0) return child;
        return (
          <>
            {separator}
            {child}
          </>
        );
      })}
    </>
  );
}

export { SplitNode };
export type { SplitNodeProps };
