import React from 'react';
import BookList from './components/BookList/BookList';
import './index.css';

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f8', padding: 24 }}>
      <BookList />
    </div>
  );
}

export default App;
