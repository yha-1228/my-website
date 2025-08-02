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
