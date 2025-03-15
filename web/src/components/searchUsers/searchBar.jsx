import { useState } from 'react';

function SearchBar({ onChange }) {

  const [value, setSearchValue] = useState("");

  const handleChange = (letter) => {
    const newQuery = letter.target.value;
    setSearchValue(newQuery);
    
    if (onChange) {
      onChange(newQuery);
    }
  };

  // To avoid constantly refreshing the page
  const handleSubmit = (event) => {
    event.preventDefault();

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <form className="d-flex w-100" onSubmit={handleSubmit}>
          <div className="input-group w-100">
            <input 
              className="form-control" 
              type="search" 
              placeholder="Search User..." 
              aria-label="Search User..."
              value={value}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>

    </nav>
  );
}

export default SearchBar;