import { getState, setState } from '../app.state';
import { createButton } from '../utils/createButton';
import { renderApp } from './App';
export function ThemeToggle(): HTMLElement {
  const btn = createButton(getState.theme === 'light'?'☾':'☀',
    {
      className: 'theme-toggle',
      onClick: ()=>{
        setState({
          theme: getState.theme === 'light'?'dark': 'light',
        });
        renderApp();
      }
    }
  )

  return btn;
}
