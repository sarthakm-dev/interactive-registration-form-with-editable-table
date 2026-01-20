import { appState, setState } from '../../app.state';
import * as dom from '../../utils/dom';
import { renderApp } from '.././App';
import { getRatingHint } from './RatingHint';

export function renderRatingGroup(
  category: string,
  label: string,
): HTMLElement {
  const group = dom.createElement('div', {
    className: 'rating-group',
    attributes: { 'data-category': category },
  });

  if (appState.validationErrors[category]) {
    group.classList.add('error-field');
  }

  group.appendChild(dom.createElement('p', { text: label }));

  const starRating = dom.createElement('div', { className: 'star-rating' });
  for (let i = 1; i <= 5; i++) {
    const starItem = dom.createElement('div', { className: 'star-item' });
    const star = dom.createElement('div', {
      className: (appState.ratingData[category] || 0) >= i ? ['star', 'active'] : ['star'],
      text: '★',
      attributes: { 'data-value': String(i) },
    });

    star.addEventListener('mouseenter',()=>{
        const stars = group.querySelectorAll<HTMLElement>('.star');
        stars.forEach((s,index)=>{
            s.classList.toggle('hover',index<i);
        });
    });

    group.addEventListener('mouseleave',()=>{
        const stars = group.querySelectorAll<HTMLElement>('.star');
        const saved = appState.ratingData[category] || 0;
        stars.forEach((s,index)=>{
            s.classList.remove('hover');
            s.classList.toggle('active',index<saved);
        });
    });

    star.addEventListener('click', () => {
      setState({
        ratingData: { ...appState.ratingData, [category]: i as any },
        validationErrors: { ...appState.validationErrors },
      });
      renderApp();
    });
    
    starItem.appendChild(star);
    starItem.appendChild(
      dom.createElement('div', { className: 'point-hint', text: getRatingHint(i) }),
    );
    starRating.appendChild(starItem);
  }

  group.appendChild(starRating);
  
  const errorMsg = dom.createElement('small', { 
    className: appState.validationErrors[category] ? 'error show' : 'error',
    text: 'This is a required field' 
  });
  group.appendChild(errorMsg);

  return group;
}