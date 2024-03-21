import { useState } from "react";

import "./SearchBar.css";

const SearchBar = ({ setResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  //cambiar y poner la Api de nosotros para llamar la lista de productos
  const fetchData = (value) => {
    fetch("http://localhost:8081/api/admin/products")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setSearchTerm(value);
    fetchData(value);
  };

  return (
    <div className="input-container">
      <input
        className='input-barra'
        type='text'
        placeholder="Guitarra Fender CD60s"
        value={searchTerm}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
export default SearchBar;
