// ListBooks.js
import React, { useEffect } from 'react'; // Импортируем хук useEffect 
import './ListBooks.css';

const ListBooks = ({ books, onBookClick }) => {
  // Эффект для отслеживания момента монтирования компонента
  useEffect(() => {
    console.log('ListBooks mounted');

    // Функция, вызываемая при размонтировании компонента
    return () => {
      console.log('ListBooks unmounted');
    };
  }, []);

  // Эффект для отслеживания обновлений компонента
  useEffect(() => {
    console.log('ListBooks updated');
  });

  return (
    <div>
      <h2>List of Books</h2>
      <ul>
        {books.map((book) => ( // Используем метод map. Для каждой книги из массива books создается li который при клике вызывает функцию onBookClick
          <li key={book.id} onClick={() => onBookClick(book)}>
            <strong>{book.title}</strong> by {book.author} - {book.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListBooks;
