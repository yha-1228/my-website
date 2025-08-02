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

export function findSiblings(base: Element | null): Element[] {
  if (!base) return [];

  const parentElement = base.parentElement;
  if (!parentElement) return [];

  const siblings = Array.from(parentElement.children).filter(
    (child) => child !== base,
  );

  return siblings;
}

type RestoreFunction = () => void;

export function hideSiblingsAsAria(base: Element | null): RestoreFunction {
  const siblings = findSiblings(base);
  const targetsToSetAriaHidden = siblings.filter(
    (element) => element.getAttribute("aria-hidden") !== "true",
  );

  targetsToSetAriaHidden.forEach((element) =>
    element.setAttribute("aria-hidden", "true"),
  );

  return function () {
    targetsToSetAriaHidden.forEach((element) =>
      element.removeAttribute("aria-hidden"),
    );
  };
}
