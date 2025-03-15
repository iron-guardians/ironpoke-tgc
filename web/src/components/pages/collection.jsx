import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

import {getUser, getSet} from "../../services/api-service";
import "./collection.css";

function CollectionPage() {
    const navigate = useNavigate();
    const { userId, setId } = useParams();
    const [user, setUser] = useState(undefined);
    const [userCards, setUserCards] = useState([]);
    const [cardSet, setCardSet] = useState([]);

    useEffect(() => {
        getUser(userId)
            .then((data) => {
                setUser(data);

                const filteredCards = userCards.filter(card => card.set.id === setId);
                setUserCards(filteredCards);
            })
            .catch(() => setUser(null));
        
        getSet(setId)
            .then((data) => {
                console.log(data[0]);
                setCardSet(data[0]);
            })
            .catch(() => setCardSet(null));
    }, []);

    return (
        (user && cardSet) ? (
            <div className="collection-page">
                <img  onClick={() => navigate(`/profile/${user.id}`)} src={cardSet.images?.logo} alt={setId} className="set-logo" />
                <div className="card-grid">
                    {Array.from({ length: cardSet.total }).map((_, index) => {
                        const card = userCards.find(card => card.number === String(index + 1));
                        return (
                            <div key={index} className="card-slot">
                                {card ? (
                                    <img src={card.images.small} alt={card.name} className="card-image" />
                                ) : (
                                    <div className="empty-slot">
                                        <span className="card-number">{index + 1}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        ) : (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    );
}

export default CollectionPage;