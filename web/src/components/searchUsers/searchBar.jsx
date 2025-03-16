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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <nav className="sticky navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <form className="d-flex w-100" onSubmit={handleSubmit}>
          <div className="input-group w-100">
            <span className="input-group-text bg-white border-end-0">
              <i className="fas fa-search"></i>
            </span>
            <input
              className="form-control border-start-0"
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