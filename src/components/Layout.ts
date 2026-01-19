export function Layout(
  left: HTMLElement,
  right: HTMLElement
): HTMLDivElement {
  const container = document.createElement('div');
  container.className = 'layout';

  const leftPanel = document.createElement('div');
  leftPanel.className = 'layout-left';

  const rightPanel = document.createElement('div');
  rightPanel.className = 'layout-right';

  leftPanel.appendChild(left);
  rightPanel.appendChild(right);

  container.append(leftPanel, rightPanel);
  return container;
}