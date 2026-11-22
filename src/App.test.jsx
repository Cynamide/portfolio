import { test, expect, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

afterEach(() => { cleanup(); window.history.replaceState({}, '', '/'); });

test('preserves project demos and links to the ML Systems notes', () => {
  render(<App />);
  expect(screen.getByText('QuiverAI')).toBeInTheDocument();
  expect(screen.getByText('LocalEval')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /try it out/i })).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /see it in action/i })).toHaveLength(4);
  expect(screen.getByRole('link', { name: /ML Systems/i })).toHaveAttribute('href', '/blog/ml-systems');
});

test('shows an empty Foundations section on the ML Systems page', () => {
  window.history.replaceState({}, '', '/blog/ml-systems');
  render(<App />);
  expect(screen.getByRole('heading', { name: /ML Systems/i })).toBeInTheDocument();
  const summary = screen.getByText('Foundations').closest('summary');
  const topic = summary.closest('details');
  expect(topic).not.toHaveAttribute('open');
  fireEvent.click(summary);
  expect(topic).toHaveAttribute('open');
  expect(screen.getByText('Notes coming soon.')).toBeInTheDocument();
});
