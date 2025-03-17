import { PageLayout } from "../layouts";
import { ImagenCarga } from "../imagenCarga";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profile } from "../../services/api-service";
import { Carousel } from "../carousel";


const imageUrls = [
  "https://ultimainformatica.com/3171113-thickbox_default/juego-de-cartas-pokemon-tcg-sv07-sleeved-booster-24-unidades-espanol.jpg",
  "https://cdn.myshoptet.com/usr/www.pokepop.cz/user/shop/big/1209_p9505-sv06-3d-booster-wraps-dragapult-en-779x1427-43c231f.png?664b455c",
  "https://cdn.myshoptet.com/usr/www.pokemagic.cz/user/shop/big/4010_sv09-3d-booster-wraps-standard-n-en-779x1427-43c231f.png?67a7af8e",
  "https://cdn.myshoptet.com/usr/www.pokemagic.cz/user/shop/big/3901_p9508-sv08-3d-booster-wraps-pikachustellar-en-779x1427-43c231f.png?6706d166"// Agrega más imágenes según necesites
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
  if (!user){
    return <ImagenCarga />

  } 


  return (
    
      <div>
      <PageLayout variant={"custom"}>
        <div className="container  d-flex flex-column align-items-center justify-content-center">

      <Carousel images={imageUrls} />
      </div>
        
      </PageLayout>
    </div>
    ) 
 
  
}

export default Home;