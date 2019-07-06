/**
 * Helper method to check if element is hidden, since we cannot use :visible without jQuery
 * @param element The element to check for visibility
 * @returns true if element is hidden
 */
export function elementIsHidden(element: HTMLElement): boolean {
  return element.offsetWidth === 0 && element.offsetHeight === 0;
}
