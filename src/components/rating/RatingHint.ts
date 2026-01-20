export function getRatingHint(value: number): string {
  const hints = ['', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent'];
  return hints[value] || '';
}