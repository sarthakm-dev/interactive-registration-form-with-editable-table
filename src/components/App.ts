import {Header} from './Header'
import { FeedbackForm } from './FeedbackForm';
import { FeedbackTable } from './FeedbackTable';

export function renderApp():void{
    const root = document.getElementById('app');
    if(!root) throw new Error('Missing #app');
    root.innerHTML = '';
    const app = document.createElement('div');
    app.className = 'app';
    app.appendChild(Header);
    app.appendChild(FeedbackForm);
    app.appendChild(FeedbackTable);
    root.appendChild(app);
}