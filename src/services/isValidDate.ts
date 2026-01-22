export function isValidDate(v: string | null): boolean {
  return v!==null && v.trim() !== '';
}