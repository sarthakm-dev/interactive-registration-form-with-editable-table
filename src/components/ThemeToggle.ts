import { getState, setState } from '../app.state';
import { createButton } from '../ui/createButton';
import { renderApp } from '.';
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
