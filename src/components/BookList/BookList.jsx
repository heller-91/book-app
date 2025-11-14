import React, { useState, useRef, useEffect } from 'react';
import BookItem from '../BookItem/BookItem';
import { initialBooks } from '../../data/mockBooks';
import styles from './BookList.module.css';

function BookList() {
  const [books, setBooks] = useState(initialBooks);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '' });
  const [formError, setFormError] = useState(null);

  const anchorRef = useRef(null);      // New Item button ref
  const popupRef = useRef(null);       // popup container ref
  const titleInputRef = useRef(null);  // input to autofocus

  // open popup and reset form
  const openPopup = () => {
    setForm({ title: '', description: '', imageUrl: '' });
    setFormError(null);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setFormError(null);
    // restore focus to anchor button
    if (anchorRef.current) anchorRef.current.focus();
  };

  // close on outside click
  useEffect(() => {
    if (!isPopupOpen) return;
    const onDocClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target) && anchorRef.current && !anchorRef.current.contains(e.target)) {
        closePopup();
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') closePopup();
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [isPopupOpen]);

  // autofocus title input when popup opens (only once per open)
  useEffect(() => {
    if (isPopupOpen && titleInputRef.current) {
      // next tick to ensure it's visible
      setTimeout(() => titleInputRef.current.focus(), 0);
    }
  }, [isPopupOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setFormError('Title is required');
      return;
    }
    const next = {
      id: Date.now().toString(),
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      imageUrl: form.imageUrl.trim() || undefined,
    };
    setBooks(prev => [next, ...prev]);
    closePopup();
  };

  return (
    <section aria-label="Books" className={styles.booklistRoot}>
      <div className={styles.booklistHeader}>
        <h2>Book list</h2>
        <div className={styles.anchorWrap}>
          <button
            type="button"
            onClick={() => (isPopupOpen ? closePopup() : openPopup())}
            className={styles.addButton}
            ref={anchorRef}
            aria-expanded={isPopupOpen}
            aria-haspopup="dialog"
          >
            New Item
          </button>

          {isPopupOpen && (
            <div
              ref={popupRef}
              className={styles.popup}
              role="region"
              aria-label="Add new book"
            >
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.field}>
                  <label htmlFor="book-title">Title <span aria-hidden="true">*</span></label>
                  <input
                    id="book-title"
                    name="title"
                    ref={titleInputRef}
                    value={form.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Clean Code"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="book-desc">Description</label>
                  <textarea
                    id="book-desc"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Short summary (optional)"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="book-image">Image URL</label>
                  <input
                    id="book-image"
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/cover.jpg (optional)"
                  />
                </div>

                {formError && <div className={styles.error} role="alert">{formError}</div>}

                <div className={styles.actions}>
                  <button type="button" onClick={closePopup} className={styles.cancelBtn}>Cancel</button>
                  <button type="submit" className={styles.submitBtn}>Add Book</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <div className={styles.booklistItems}>
        {books.map((b) => (
          <BookItem
            key={b.id}
            id={b.id}
            title={b.title}
            description={b.description}
            imageUrl={b.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}

export default BookList;
