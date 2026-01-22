import { EMAIL_REGEX } from '.././config/email.config';

export function isValidEmail(v: string | null): boolean {
  return v!==null && EMAIL_REGEX.test(v);
}