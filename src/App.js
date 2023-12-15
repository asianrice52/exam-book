// App.js
import React, { useState, useEffect } from 'react';
import ListBooks from './components/ListBooks/ListBooks';
import BookDetail from './components/BookDetail/BookDetail';
import AddEditBook from './components/AddEditBook/AddEditBook';
import Search from './components/Search';
import './styles/main.css';

const App = () => {
   // Состояние для хранения списка книг
  const [books, setBooks] = useState(JSON.parse(localStorage.getItem('books')) || []);
  // Состояние для хранения выбранной книги
  const [selectedBook, setSelectedBook] = useState(null);
  // Состояние для определения, добавляется ли новая книга
  const [isAdding, setAdding] = useState(false);
  // Состояние для фильтрации списка книг по запросу
  const [filter, setFilter] = useState('');
  // Состояние для хранения отфильтрованных книг
  const [filteredBooks, setFilteredBooks] = useState(books);

  // Эффект, выполняющийся при изменении состояний books и filter
  useEffect(() => {
    
     // Обновление отфильтрованных книг при изменении books. Аналог 
    handleSearch(filter);

    // Сохранение данных в Local Storage при каждом обновлении books
    localStorage.setItem('books', JSON.stringify(books));
  }, [books, filter]);

  // Обработчик клика по книге
  const handleBookClick = (book) => {
    setSelectedBook(book);
    setAdding(false);
  };

  // Обработчик сохранения (добавления или редактирования) книги
  const handleSaveBook = (newBook) => {
    setBooks((prevBooks) => {
      const updatedBooks = [...prevBooks];
      const existingBookIndex = prevBooks.findIndex((book) => book.id === newBook.id);

      // Редактирование существующей книги
      if (existingBookIndex !== -1) {
        updatedBooks[existingBookIndex] = newBook;
      } else {
        // Добавление новой книги
        newBook.id = prevBooks.length + 1;
        updatedBooks.push(newBook);
      }

      return updatedBooks;
    });

    // Сброс выбранной книги и режима добавления
    setSelectedBook(null);
    setAdding(false);
  };

  // Обработчик удаления книги
  const handleDeleteBook = () => {
    if (selectedBook) {
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== selectedBook.id)
      );

      // Сброс выбранной книги и режима добавления
      setSelectedBook(null);
      setAdding(false);
    }
  };

  // Обработчик поиска книги
  const handleSearch = (query) => {
    setFilter(query);
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );

     // Обновление отфильтрованных книг
    setFilteredBooks(filtered);
  };

  // Обработчик добавления новой книги
  const handleAddBook = () => {
    setSelectedBook(null);
    setAdding(true);
  };

  // Возвращаем разметку компонента
  return (
    <div>
      <h1>Book Management App</h1>
        <ListBooks books={filteredBooks} onBookClick={handleBookClick} />
        <BookDetail book={selectedBook} />
        {isAdding ? (
          <AddEditBook onSave={handleSaveBook} onDelete={handleDeleteBook} />
        ) : (
          <div>
            <button onClick={handleAddBook}>Add Book</button>
            <Search onSearch={handleSearch} />
            {selectedBook && (
              <AddEditBook onSave={handleSaveBook} onDelete={handleDeleteBook} bookToEdit={selectedBook} />
            )}
          </div>
        )}
    </div>
  );
};

export default App;
