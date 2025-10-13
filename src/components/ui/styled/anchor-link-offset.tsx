import { type ElementType } from "react";

import { type PropsWithAs } from "@/types/react";
import { cn } from "@/utils/styling";

type SomeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// アンカーリンクでスクロールしたとき、ヘッダー分の高さ+αだけ下にずらす。
// htmlにscroll-padding-topを指定する方法だと、次のバグがあるため使わない。
//
// 詳細:
// position: stickyを付与した要素の上にリンクやボタンがあるとき、
// そこにTabでフォーカスすると背景が勝手にスクロールされる。
export function AnchorLinkOffset<T extends ElementType>(
  props: SomeRequired<PropsWithAs<T, "div">, "id">,
) {
  const { as: Comp = "div", className, ...rest } = props;

  return (
    <Comp
      className={cn(
        "-mt-[calc(var(--height-header)_+_--spacing(7))]",
        "pt-[calc(var(--height-header)_+_--spacing(7))]",
        className,
      )}
      {...rest}
    />
  );
}
