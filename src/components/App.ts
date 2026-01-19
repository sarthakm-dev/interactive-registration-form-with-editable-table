import { ThemeToggle } from './ThemeToggle';
import { Stepper } from './Stepper';
import { ActiveForm } from './FormSections';
import { Table } from './Table';
import { Layout } from './Layout';
import { Button } from './ui/Button';
import { submitForm } from '../app.logic';
import { state } from '../app.state';

export function renderApp(): void {
  const root = document.getElementById('app')!;
  root.innerHTML = '';

  const header = ThemeToggle();

  const left = document.createElement('div');
  left.append(
    Stepper(),
    ActiveForm(),
    Button(
      state.editingId ? 'Update Feedback' : 'Submit Feedback',
      submitForm
    )
  );

  root.append(header, Layout(left, Table()));
}