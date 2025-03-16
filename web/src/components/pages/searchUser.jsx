import { PageLayout } from "../layouts";
import { SearchBar } from "../searchUsers";
import { UserCards } from "../searchUsers";
import { useState, useEffect } from 'react';

import "./searchUser.css";

function SearchUser() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSearch = (searchValue) => {
    console.log("Buscando:", searchValue);
    if (!searchValue) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  return (
    <PageLayout>
      <div className="container-fluid px-0">
        <div className="row position-sticky top-0 bg-white z-index-1000">
          <div className="col-12 p-3">
            <SearchBar onChange={handleSearch} />
          </div>
        </div>

        <div className="scrollable-content p-3">
          <div className="row">
            {filteredUsers.map((user) => (
              <div key={user.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <UserCards user={user} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default SearchUser;