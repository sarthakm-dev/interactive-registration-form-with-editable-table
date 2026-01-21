import { isValidDate, isValidEmail, isValidOrder } from "../app.logic";

export function validateField(field: 'orderNumber' | 'email' | 'purchaseDate', value: string | undefined) {
    if (field === 'orderNumber') {
        return value && isValidOrder(value) ? undefined : true;
    }
    if (field === 'email') {
        return value && isValidEmail(value) ? undefined : true;
    }
    if(field === 'purchaseDate') {
        return value && isValidDate(value) ? undefined : true;
    }
    return undefined;
} 