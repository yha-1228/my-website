/**
 * 指定した要素の配下にあるフォーカス可能な要素の配列を取得する。
 */
function findFocusableElements(parentElement: HTMLElement) {
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
function loopFocus(event: KeyboardEvent, parentElement: HTMLElement | null) {
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

      const nextFocusElement = focusableElements[0];
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

interface ScrollWithFocusParams {
  scrollToOptions?: Omit<ScrollToOptions, "behavior">;
  idToFocus: string;
}

/**
 * 所定の位置にスクロールしたあと、所定の要素にフォーカスする。
 */
function scrollWithFocus(params: ScrollWithFocusParams) {
  const { scrollToOptions, idToFocus } = params;

  const motionReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  window.scrollTo({
    ...scrollToOptions,
    behavior: motionReduced ? "instant" : "smooth",
  });

  const fieldElem = document.getElementById(idToFocus);
  fieldElem?.focus({ preventScroll: !motionReduced });
}

export {
  findFocusableElements,
  loopFocus,
  type ScrollWithFocusParams,
  scrollWithFocus,
};
