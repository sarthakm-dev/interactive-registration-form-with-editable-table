import { getState, setState } from '../../core/state';
import { createElement } from '../../ui/create-element';
import { getRatingHint } from './rating.hint';


export function renderRatingGroup(
  category: string,
  label: string,
): HTMLElement {
  const group = createElement('div', {
    className: 'rating-group',
    attributes: { 'data-category': category },
  });

  if (getState.validationErrors[category]) {
    group.classList.add('error-field');
  }

  group.appendChild(createElement('p', { text: label }));

  const starRating = createElement('div', { className: 'star-rating' });
  for (let i = 1; i <= 5; i++) {
    const starItem = createElement('div', { className: 'star-item' });
    const star = createElement('div', {
      className: (getState.ratingData[category] || 0) >= i ? ['star', 'active'] : ['star'],
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
        const saved = getState.ratingData[category] || 0;
        stars.forEach((s,index)=>{
            s.classList.remove('hover');
            s.classList.toggle('active',index<saved);
        });
    });

    star.addEventListener('click', () => {
      setState({
        ratingData: { ...getState.ratingData, [category]: i as any },
        validationErrors: {
          ...getState.validationErrors,
          [category]: '',
        },
      });
    });
    
    starItem.appendChild(star);
    starItem.appendChild(
      createElement('div', { className: 'point-hint', text: getRatingHint(i) }),
    );
    starRating.appendChild(starItem);
  }

  group.appendChild(starRating);
  
  const errorMsg = createElement('small', { 
    className: getState.validationErrors[category] ? 'error show' : 'error',
    text: 'This is a required field' 
  });
  group.appendChild(errorMsg);

  return group;
}

