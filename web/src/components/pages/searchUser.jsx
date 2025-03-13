import { PageLayout } from "../layouts";
import { SearchBar } from "../searchUsers";
import { UserCards } from "../searchUsers";
import { useState, useEffect } from 'react';

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
    console.log("Buscando:", searchValue); // Debug
    if (!searchValue) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    )

    setFilteredUsers(filtered);
  }
  
  return (
    <PageLayout>
      <div className="container-fluid px-0 pt-5 mt-5 pb-5">

        <div className="row mb-4 position-sticky top-0 bg-white">
          <div className="col-12">
            <SearchBar onChange={handleSearch} />
          </div> 
        </div>

        {/* UserCards row - adjust columns as needed for more width utilization */}
        <div className="row mb-4">
          {filteredUsers.map((user) => (
            <div 
              key={user.id} 
              className="col-12 col-md-6"
            >
              <UserCards user={user} />
            </div>    
          ))} 
        </div>

      </div>
    </PageLayout>
  );
}

export default SearchUser;