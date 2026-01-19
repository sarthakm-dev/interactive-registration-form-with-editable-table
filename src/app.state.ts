import { type  AppState } from "./types";

export const state: AppState ={
    theme:'light',
    step: 0,
    editingId:null,
    feedback:[],
    form: {
        orderNumber: '',
        email: '',
        purchaseDate: '',
        shoppingMethod: '',
        supportContacted:'no',
        rating: {},
        comment: {
            like: '',
            improve: '',
            additional: ''
        }
    }
}