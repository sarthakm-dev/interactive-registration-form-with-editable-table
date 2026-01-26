import { renderApp } from '../components';
import { getState, setState } from '../core/state';
import { createButton } from './create-button';

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



