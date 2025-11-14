import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders Book list heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /book list/i });
  expect(heading).toBeInTheDocument();
});
