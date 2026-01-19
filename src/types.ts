export type Theme = 'light' | 'dark';

export interface Rating{
    [category:string] : number;
}

export interface Feedback{
    id: string;
    orderNumber: string;
    email: string;
    purchaseDate: string;
    shoppingMethod: string;
    supportContacted: 'yes' | 'no';
    rating: Rating;
    comment: {
        like: string;
        improve: string;
        additional: string;
    };
}
export interface AppState{
    theme: Theme;
    step: number;
    editingId: string|null;
    feedback: Feedback[];
    form: Omit<Feedback,'id'>;
}