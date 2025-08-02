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

/**
 * `Tab`または`Shift + Tab`によるフォーカスを、指定した要素の配下に限定する。
 */
export function loopFocus(
  event: KeyboardEvent,
  parentElement: HTMLElement | null,
) {
  if (!parentElement) return;

  if (event.key === "Tab") {
    const focusableElements = findFocusableElements(parentElement);
    if (focusableElements.length === 0) return;

    const activeFocusIndex = focusableElements.findIndex(
      (element) => element === document.activeElement,
    );

    // 最後から進もうとしたら、最初に飛ばす
    if (!event.shiftKey && activeFocusIndex === focusableElements.length - 1) {
      event.preventDefault();

      const nextFocusElement = focusableElements.at(0);
      nextFocusElement?.focus();
      return;
    }

    // 最初から戻ろうとしたら、最後に飛ばす
    if (event.shiftKey && activeFocusIndex === 0) {
      event.preventDefault();

      const nextFocusElement = focusableElements.at(-1);
      nextFocusElement?.focus();
      return;
    }
  }
}

/**
 * 所定の位置にスクロールしたあと、所定の要素にフォーカスする。
 */
export function scrollWithFocus(
  element: HTMLElement,
  scrollToOptions?: Omit<ScrollToOptions, "behavior">,
) {
  const motionReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  window.scrollTo({
    ...scrollToOptions,
    behavior: motionReduced ? "instant" : "smooth",
  });

  element?.focus({ preventScroll: !motionReduced });
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
