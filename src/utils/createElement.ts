export function createElement(
  tag: string,
  options?: {
    className?: string | string[];
    attributes?: Record<string, string | number>;
    children?: (HTMLElement | string)[];
    text?: string;
  },
): HTMLElement {
  const el = document.createElement(tag);

  if (options?.className) {
    const classes = Array.isArray(options.className)
      ? options.className
      : options.className.split(' ').filter(Boolean);
    classes.forEach((cls) => el.classList.add(cls));
  }

  if (options?.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      el.setAttribute(key, String(value));
    });
  }

  if (options?.children) {
    options.children.forEach((child) => {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child));
      } else {
        el.appendChild(child);
      }
    });
  } else if (options?.text) {
    el.textContent = options.text;
  }

  return el;
}