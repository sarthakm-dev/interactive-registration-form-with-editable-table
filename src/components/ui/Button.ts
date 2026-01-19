export function Button(
  label: string,
  onClick: () => void
): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.onclick = onClick;
  return btn;
}