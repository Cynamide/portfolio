import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('preserves the original project demos alongside recent experience', () => {
  render(<App />);
  expect(screen.getByText('QuiverAI')).toBeInTheDocument();
  expect(screen.getByText('LocalEval')).toBeInTheDocument();
  expect(screen.getByText('WGAN-GP')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /try it out/i })).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /see it in action/i })).toHaveLength(4);
});
