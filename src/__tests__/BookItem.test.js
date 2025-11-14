// src/__tests__/BookItem.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookItem from '../components/BookItem/BookItem';

test('toggle button shows/hides description and updates aria-expanded', () => {
  render(<BookItem id="t1" title="Test Book" description="details here" />);

  const btn = screen.getByRole('button', { name: /show description/i });
  expect(btn).toBeInTheDocument();
  // initial state should be collapsed
  expect(btn).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(btn);
  // after click, description visible and aria-expanded true
  expect(btn).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText('details here')).toBeInTheDocument();

  fireEvent.click(btn);
  expect(btn).toHaveAttribute('aria-expanded', 'false');
});
