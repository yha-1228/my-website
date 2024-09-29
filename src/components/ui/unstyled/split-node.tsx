import { Children, type ReactNode } from 'react';

export default function splitNode(node: ReactNode, separator: ReactNode) {
  return (
    <>
      {Children.map(node, (child, index) => {
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
