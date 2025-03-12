function SearchBar () {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSearch" 
          aria-controls="navbarSearch" 
          aria-expanded="true" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSearch">
          <form className="d-flex w-100">
            <div className="input-group w-100">
              <input 
                className="form-control" 
                name="searchInput" 
                type="search" 
                placeholder="Search User..." 
                aria-label="Search User..." 
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default SearchBar;