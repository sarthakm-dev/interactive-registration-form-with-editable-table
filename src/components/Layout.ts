export function Layout(
  left: HTMLElement,
  right: HTMLElement
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'layout';

  const leftCol = document.createElement('div');
  leftCol.className = 'layout-left';
  leftCol.appendChild(left);

  const rightCol = document.createElement('div');
  rightCol.className = 'layout-right';
  rightCol.appendChild(right);

  container.append(leftCol, rightCol);
  return container;
}