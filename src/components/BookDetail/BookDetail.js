// BookDetail.js
import React, { useEffect } from 'react'; // Импортируем хук useEffect
import './BookDetail.css';

const BookDetail = ({ book }) => {
  // Эффект для отслеживания момента монтирования компонента
  useEffect(() => {
    console.log('BookDetail mounted');

    // Функция, вызываемая при размонтировании компонента
    return () => {
      console.log('BookDetail unmounted');
    };
  }, []);

  // Эффект для отслеживания обновлений компонента
  useEffect(() => {
    console.log('BookDetail updated');
  });

  return (
    <div>
      {book ? (
        <div>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>Description: {book.description}</p>
          {/* Другие детали книги */}
        </div>
      ) : (
        <p>No book selected</p>
      )}
    </div>
  );
};

export default BookDetail;
