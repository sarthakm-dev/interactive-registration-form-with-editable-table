export function updateElementInPlace(
  elementId: string,
  renderFn: () => HTMLElement
): void {
  const element = document.getElementById(elementId);
  if (!element) { 
    return;
  }
  
  const parent = element.parentNode;
  if (!parent) {
    return;
  }
  
  const newElement = renderFn();
  parent.replaceChild(newElement, element);
}


