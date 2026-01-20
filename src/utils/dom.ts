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

export function createInput(
  type: string = 'text',
  options?: {
    name?: string;
    id?: string;
    placeholder?: string;
    value?: string;
    checked?: boolean;
    className?: string | string[];
    attributes?: Record<string, string | number>;
    onChange?: (e: Event) => void;
  },
): HTMLInputElement {
  const input = createElement('input', {
    className: options?.className,
    attributes: {
      type,
      ...(options?.name && { name: options.name }),
      ...(options?.id && { id: options.id }),
      ...(options?.placeholder && { placeholder: options.placeholder }),
      ...(options?.value && { value: options.value }),
      ...options?.attributes,
    },
  }) as HTMLInputElement;

  // Handle checked state specially for radio/checkbox
  if (options?.checked) {
    input.checked = true;
  }

  if (options?.onChange) {
    input.addEventListener('change', options.onChange);
  }

  return input;
}

export function createLabel(text: string, forId?: string): HTMLLabelElement {
  const label = createElement('label', { text }) as HTMLLabelElement;
  if (forId) {
    label.setAttribute('for', forId);
  }
  return label;
}

export function createTable(
  headers: string[],
  rows: (HTMLElement | string)[][],
): HTMLTableElement {
  const table = createElement('table') as HTMLTableElement;

  // Create thead
  const thead = createElement('thead');
  const headerRow = createElement('tr');
  headers.forEach((header) => {
    const th = createElement('th', { text: header });
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create tbody
  const tbody = createElement('tbody');
  rows.forEach((row) => {
    const tr = createElement('tr');
    row.forEach((cell) => {
      const td = createElement('td');
      if (typeof cell === 'string') {
        td.textContent = cell;
      } else {
        td.appendChild(cell);
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  return table;
}

export function clearElement(el: HTMLElement): void {
  el.innerHTML = '';
}

export function toggleClass(el: HTMLElement, className: string, force?: boolean): void {
  el.classList.toggle(className, force);
}

export function addClass(el: HTMLElement, className: string | string[]): void {
  if (Array.isArray(className)) {
    className.forEach((c) => el.classList.add(c));
  } else {
    el.classList.add(className);
  }
}

export function removeClass(el: HTMLElement, className: string | string[]): void {
  if (Array.isArray(className)) {
    className.forEach((c) => el.classList.remove(c));
  } else {
    el.classList.remove(className);
  }
}

export function hasClass(el: HTMLElement, className: string): boolean {
  return el.classList.contains(className);
}

export function setAttributes(el: HTMLElement, attrs: Record<string, string | number>): void {
  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, String(value));
  });
}

export function getAttribute(el: HTMLElement, attr: string): string | null {
  return el.getAttribute(attr);
}

export function setText(el: HTMLElement, text: string): void {
  el.textContent = text;
}

export function getText(el: HTMLElement): string {
  return el.textContent || '';
}

export function appendChild(parent: HTMLElement, child: HTMLElement | string): void {
  if (typeof child === 'string') {
    parent.appendChild(document.createTextNode(child));
  } else {
    parent.appendChild(child);
  }
}

export function appendChildren(
  parent: HTMLElement,
  children: (HTMLElement | string)[],
): void {
  children.forEach((child) => appendChild(parent, child));
}

export function show(el: HTMLElement): void {
  el.style.display = '';
  removeClass(el, 'hidden');
}

export function hide(el: HTMLElement): void {
  addClass(el, 'hidden');
}

export function isHidden(el: HTMLElement): boolean {
  return hasClass(el, 'hidden') || el.style.display === 'none';
}

export function scrollTo(el: HTMLElement, behavior: ScrollBehavior = 'smooth'): void {
  el.scrollIntoView({ behavior });
}

export function queryId(id: string): HTMLElement | null {
  return document.getElementById(id);
}

export function querySelector(selector: string): HTMLElement | null {
  return document.querySelector(selector);
}

export function querySelectorAll(selector: string): HTMLElement[] {
  return Array.from(document.querySelectorAll(selector));
}

export function removeElement(el: HTMLElement): void {
  el.remove();
}

export function replaceElement(oldEl: HTMLElement, newEl: HTMLElement): void {
  oldEl.replaceWith(newEl);
}