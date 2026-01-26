import {  setState } from '../../core/state';

export function handleDelete(index: number): void {
  setState({
    deletingIndex: index,
  });
}
