import { ORDER_REGEX } from "../config/order-config";

export function isValidOrder(v: string | null): boolean {
  return v!==null && ORDER_REGEX.test(v);
}
