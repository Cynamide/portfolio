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
  expect(screen.getByText('Estimated KV cache for this batch').parentElement).toHaveTextContent('0.268 GB');
  fireEvent.change(screen.getByLabelText(/Requests in the batch/), { target: { value: '2' } });
  expect(screen.getByText('Estimated KV cache for this batch').parentElement).toHaveTextContent('0.537 GB');
});


test('explores pipeline and quantization estimates', () => {
  window.history.replaceState({}, '', '/blog/ml-systems');
  render(<App />);
  fireEvent.click(screen.getByText('Optimization'));
  fireEvent.click(screen.getByText('When the GPU waits for data'));
  const workerSlider = screen.getByLabelText(/CPU workers/);
  fireEvent.change(workerSlider, { target: { value: '16' } });
  expect(screen.getByText('43.7%')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Quantization and performance'));
  fireEvent.click(screen.getByRole('button', { name: 'INT4' }));
  expect(screen.getByText('Speedup vs FP16').parentElement).toHaveTextContent('3.4×');
});


test('compares paged and contiguous KV allocation', () => {
  window.history.replaceState({}, '', '/blog/ml-systems');
  render(<App />);
  fireEvent.click(screen.getByText('Foundations'));
  fireEvent.click(screen.getByText('KV cache and paged attention'));
  expect(screen.getByText('Paged slots reserved').parentElement).toHaveTextContent('1,008');
  fireEvent.click(screen.getByRole('button', { name: '256 tokens' }));
  expect(screen.getByText('Paged slots reserved').parentElement).toHaveTextContent('1,024');
  fireEvent.click(screen.getByRole('button', { name: 'Paged', exact: true }));
  expect(screen.getByText(/new request uses four separate free blocks/)).toBeInTheDocument();
});
