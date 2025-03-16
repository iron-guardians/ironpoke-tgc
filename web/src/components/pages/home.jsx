import { PageLayout } from "../layouts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profile } from "../../services/api-service";


function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await profile();
        setUser(userData);
      } catch (error) {
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);
  if (!user) return <div>Loading...</div>;


  return (
    
      <div>
      <PageLayout variant={"custom"}>
        
      </PageLayout>
    </div>
    ) 
 
  
}

export default Home;