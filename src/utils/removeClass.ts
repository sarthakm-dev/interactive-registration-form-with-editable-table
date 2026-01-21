export function removeClass(el: HTMLElement, className: string | string[]): void {
  if (Array.isArray(className)) {
    className.forEach((c) => el.classList.remove(c));
  } else {
    el.classList.remove(className);
  }
}