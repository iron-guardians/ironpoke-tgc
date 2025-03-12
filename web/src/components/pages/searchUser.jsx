import { PageLayout } from "../layouts";
import { SearchBar } from "../searchUsers";
import { UserCards } from "../searchUsers";

function SearchUser() {
  return (
    <PageLayout>
           <div className="container-fluid px-0 pt-5 mt-5 pb-5">
        <div className="row mb-4">
          <div className="col-12">
        
            <SearchBar />
          </div>
        </div>
                {/* UserCards row - adjust columns as needed for more width utilization */}
        <div className="row mb-4">
         
          <div>
            <UserCards />
          </div>
          <div>
            <UserCards />
          </div>
          <div>
            <UserCards />
          </div>
          <div>
            <UserCards />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default SearchUser;