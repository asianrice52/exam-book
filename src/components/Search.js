// Search.js
import React, { useState } from 'react'; // Импорт хука useState

const Search = ({ onSearch }) => {
  // Инициализация состояния хука useState
  const [query, setQuery] = useState('');

   // Функция обработки события поиска
  const handleSearch = () => {
    // Вызов переданной функции onSearch с текущим значением запроса
    onSearch(query);
  };

  return (
    <div>
      <h2>Search</h2>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
