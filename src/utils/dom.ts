/**
 * 指定した要素の配下にあるフォーカス可能な要素の配列を取得する。
 */
export function findFocusableElements(parentElement: HTMLElement) {
  return Array.from(
    parentElement.querySelectorAll<
      | HTMLAnchorElement
      | HTMLButtonElement
      | HTMLInputElement
      | HTMLTextAreaElement
    >("a, button, input, textarea"),
  );
}

