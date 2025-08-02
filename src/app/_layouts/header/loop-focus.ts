import { findFocusableElements } from "@/utils/dom";

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
