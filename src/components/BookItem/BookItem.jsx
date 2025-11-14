import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './BookItem.module.css';

const DEFAULT_PLACEHOLDER = 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg';

function BookItem({
  id,
  title,
  description,
  imageUrl,
  placeholderUrl,
  defaultOpen = false,
  onToggle,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [imgSrc, setImgSrc] = useState(imageUrl || placeholderUrl || DEFAULT_PLACEHOLDER);

  const handleToggle = useCallback(() => {
    setIsOpen(prev => {
      const next = !prev;
      if (typeof onToggle === 'function') onToggle(next);
      return next;
    });
  }, [onToggle]);

  const handleImgError = useCallback(() => {
    setImgSrc(placeholderUrl || DEFAULT_PLACEHOLDER);
  }, [placeholderUrl]);

  const descId = `book-desc-${id || Math.random().toString(36).slice(2, 9)}`;

  return (
    <article className={styles.bookItem} aria-labelledby={`book-title-${id}`}>
      <div className={styles.bookMedia}>
        <img
          className={styles.bookImg}
          src={imgSrc}
          alt={imageUrl ? `${title} cover` : 'placeholder image'}
          onError={handleImgError}
        />
      </div>

      <div className={styles.bookContent}>
        <h3 id={`book-title-${id}`} className={styles.bookTitle}>{title}</h3>

        <div className={styles.bookControls}>
          <button
            type="button"
            className={styles.toggleButton}
            onClick={handleToggle}
            aria-expanded={isOpen}
            aria-controls={descId}
          >
            {isOpen ? 'Hide' : 'Show'} description
          </button>
        </div>

        {isOpen && (
          <div id={descId} role="region" className={styles.bookDescription}>
            {description ? description : <em>No description available.</em>}
          </div>
        )}
      </div>
    </article>
  );
}

BookItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  placeholderUrl: PropTypes.string,
  defaultOpen: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default React.memo(BookItem);
