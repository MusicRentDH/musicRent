import { useState } from "react";
import { useApi } from '../../../../../context/ApiContext';

import "./SearchBar.css";

const SearchBar = ({ setResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { fetchProductsByName } = useApi();
  

  const fetchData = (value) => {
    fetchProductsByName(value)
      .then((results) => {
        setResults(results);
      })
      .catch((error) => {
        console.error('Error fetching product by name:', error);
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
