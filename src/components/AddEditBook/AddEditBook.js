// AddEditBook.js
import React, { useState, useEffect } from 'react'; // Импортируем хуки useState, useEffect
import './AddEditBook.css';

// HOC для логирования
const withLogger = (WrappedComponent) => {
  return class WithLogger extends React.Component {
    // Жизненный цикл: компонент смонтирован
    componentDidMount() {
      console.log(`Component ${WrappedComponent.name} mounted`);
    }

    // Жизненный цикл: компонент обновлен
    componentDidUpdate() {
      console.log(`Component ${WrappedComponent.name} updated`);
    }

    // Жизненный цикл: компонент будет размонтирован
    componentWillUnmount() {
      console.log(`Component ${WrappedComponent.name} unmounted`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

const AddEditBook = ({ onSave, onDelete, bookToEdit }) => {
  // Используем useState для управление состоянием компонента 
  const [id, setId] = useState(bookToEdit ? bookToEdit.id : null);
  const [title, setTitle] = useState(bookToEdit ? bookToEdit.title : '');
  const [author, setAuthor] = useState(bookToEdit ? bookToEdit.author : '');
  const [description, setDescription] = useState(bookToEdit ? bookToEdit.description : '');

  useEffect(() => {
    // Жизненный цикл: компонент смонтирован
    console.log('AddEditBook mounted');

    // Функция, вызываемая при размонтировании компонента
    return () => {
      console.log('AddEditBook unmounted');
    };
  }, []);

  useEffect(() => {
    // Жизненный цикл: компонент обновлен
    console.log('AddEditBook updated');
  });

  // Функции handleSave и handleDelete - функции которые обрабатывают события сохранения и удаления данных
  const handleSave = () => {
    // Функция для сохранения данных
    onSave && onSave({ id, title, author, description });
    // Сброс состояний после сохранения
    setId(null);
    setTitle('');
    setAuthor('');
    setDescription('');
  };

  const handleDelete = () => {
    // Функция для удаления данных
    onDelete && onDelete();
  };

  return (
    <>
      <h2>{bookToEdit ? 'Edit Book' : 'Add Book'}</h2>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <label>Author:</label>
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <br />
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <br />
      <button onClick={handleSave}>{bookToEdit ? 'Update' : 'Save'}</button>
      {bookToEdit && (
        <button onClick={handleDelete} className="delete-btn">
        Delete Book
        </button>
      )}
    </>
  );
};

export default withLogger(AddEditBook); // Компонент AddEditBook оборачивается в HOC "withLogger", что добавляет логирование
