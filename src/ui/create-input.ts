import { createElement } from "./create-element";

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
    onInput?: (e:Event) => void;
    onBlur?: (e:Event) => void;
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
  if(options?.onInput) {
    input.addEventListener('input',options.onInput);
  }
  if(options?.onBlur) {
    input.addEventListener('blur',options.onBlur);
  }
  return input;
}
