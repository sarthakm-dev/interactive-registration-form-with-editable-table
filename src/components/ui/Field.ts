export function Field(
  label: string,
  input: HTMLElement,
  error?: string
): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'field';

  const l = document.createElement('label');
  l.textContent = label;

  wrapper.appendChild(l);
  wrapper.appendChild(input);

  if (error) {
    const e = document.createElement('div');
    e.className = 'error';
    e.textContent = error;
    wrapper.appendChild(e);
  }

  return wrapper;
}