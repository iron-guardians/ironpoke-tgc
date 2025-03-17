import { PageLayout } from "../layouts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBoosterPacks } from "../../services/api-service";
import { Carousel } from "../carousel";

function Home() {
    const [boosterPacks, setBoosterPacks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedBoosterPacks = await getBoosterPacks();
                setBoosterPacks(fetchedBoosterPacks);
                console.log(fetchedBoosterPacks);
            } catch (error) {
                navigate("/404");
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <PageLayout variant={"custom"}>
            {boosterPacks.length > 0 ? (
                <div className="container d-flex flex-column align-items-center justify-content-center">
                    <h1 className="text-center">Booster Packs</h1>
                    <Carousel boosterPacks={boosterPacks} />
                </div>
            ) : (
                <div className="container d-flex flex-column align-items-center justify-content-center">
                    <h1 className="text-center">No Booster Packs available</h1>
                </div>
            )}
        </PageLayout>
    );
}

export default Home;