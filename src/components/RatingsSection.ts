import { state } from "../app.state";
export function RatingStars(label: string, key: string): HTMLElement {
  const wrap = document.createElement('div');
  const title = document.createElement('div');
  title.textContent = label;

  const stars = document.createElement('div');

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.textContent = '★';
    star.onclick = () => {
      state.form.values.ratings[key] = i;
      renderApp();
    };
    stars.appendChild(star);
  }

  wrap.append(title, stars);
  return wrap;
}