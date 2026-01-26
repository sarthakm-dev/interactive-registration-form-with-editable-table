export function addClass(el: HTMLElement, className: string | string[]): void {
  if (Array.isArray(className)) {
    className.forEach((c) => el.classList.add(c));
  } else {
    el.classList.add(className);
  }
}
