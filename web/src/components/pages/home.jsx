import { PageLayout } from "../layouts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profile } from "../../services/api-service";
import { Carousel } from "../carousel";


const imageUrls = [
  "https://ultimainformatica.com/3171113-thickbox_default/juego-de-cartas-pokemon-tcg-sv07-sleeved-booster-24-unidades-espanol.jpg",
  "https://ultimainformatica.com/3171113-thickbox_default/juego-de-cartas-pokemon-tcg-sv07-sleeved-booster-24-unidades-espanol.jpg",
  "https://ultimainformatica.com/3171113-thickbox_default/juego-de-cartas-pokemon-tcg-sv07-sleeved-booster-24-unidades-espanol.jpg",
  "https://ultimainformatica.com/3171113-thickbox_default/juego-de-cartas-pokemon-tcg-sv07-sleeved-booster-24-unidades-espanol.jpg",
  
  // Agrega más imágenes según necesites
];

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
      <Carousel images={imageUrls} />
        
      </PageLayout>
    </div>
    ) 
 
  
}

export default Home;