import { createElement } from "./createElement";

createElement
export function createButton(
  text: string,
  options?: {
    className?: string | string[];
    attributes?: Record<string, string | number>;
    onClick?: (e: Event) => void;
  },
): HTMLButtonElement {
  const button = createElement('button', {
    text,
    className: options?.className,
    attributes: options?.attributes,
  }) as HTMLButtonElement;

  if (options?.onClick) {
    button.addEventListener('click', options.onClick);
  }

  return button;
}