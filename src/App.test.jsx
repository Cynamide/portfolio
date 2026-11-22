import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('shows current experience and selected projects', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Hi, I’m Arjit/i })).toBeInTheDocument();
  expect(screen.getByText('QuiverAI')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'LocalEval' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'arjitagarwal123@gmail.com' })).toHaveAttribute('href', 'mailto:arjitagarwal123@gmail.com');
});
