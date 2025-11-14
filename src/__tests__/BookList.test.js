// src/__tests__/BookList.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BookList from '../components/BookList/BookList';
import { initialBooks } from '../data/mockBooks';

test('New Item popup adds a book to the list', async () => {
  render(<BookList />);

  // initial articles count
  const itemsBefore = screen.getAllByRole('article');
  expect(itemsBefore.length).toBe(initialBooks.length);

  // support both userEvent.setup() (newer) and legacy userEvent usage
  const user = typeof userEvent.setup === 'function' ? userEvent.setup() : userEvent;

  // open popup
  const addBtn = screen.getByRole('button', { name: /new item/i });
  await user.click(addBtn);

  // ensure popup inputs are present
  const titleInput = screen.getByLabelText(/title/i);
  const descInput = screen.getByLabelText(/description/i);
  const imageInput = screen.getByLabelText(/image url/i);

  // fill and submit
  await user.type(titleInput, 'My New Book');
  await user.type(descInput, 'A short description');
  await user.type(imageInput, 'https://example.com/cover.jpg');

  const submitBtn = screen.getByRole('button', { name: /add book/i });
  await user.click(submitBtn);

  // after submit, list should have one more article
  const itemsAfter = screen.getAllByRole('article');
  expect(itemsAfter.length).toBe(initialBooks.length + 1);

  // new title should appear
  expect(screen.getByText('My New Book')).toBeInTheDocument();
});
