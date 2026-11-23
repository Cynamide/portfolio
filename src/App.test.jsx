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

test('shows interactive Foundations notes on the ML Systems page', () => {
  window.history.replaceState({}, '', '/blog/ml-systems');
  render(<App />);
  expect(screen.getByRole('heading', { name: /ML Systems/i })).toBeInTheDocument();
  const summary = screen.getByText('Foundations').closest('summary');
  const topic = summary.closest('details');
  expect(topic).not.toHaveAttribute('open');
  fireEvent.click(summary);
  expect(topic).toHaveAttribute('open');
  fireEvent.click(screen.getByText('The memory wall'));
  expect(screen.getByText('Explore the roofline')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'H100 SXM' }));
  expect(screen.getByText('H100 ridge point')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText(/Arithmetic intensity/), { target: { value: '400' } });
  expect(screen.getByText('Limiting resource').parentElement).toHaveTextContent('Compute');
  fireEvent.click(screen.getByText('Prefill and decode'));
  fireEvent.click(screen.getByRole('button', { name: 'Decode' }));
  expect(screen.getByText('Decode step')).toBeInTheDocument();
});
