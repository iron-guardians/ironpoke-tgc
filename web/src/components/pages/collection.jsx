import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getUser, getSet, getUserCards } from "../../services/api-service";
import CardViewer from "../card-visualizer/3d-viewer"; // Import the 3D viewer
import "./collection.css";

function CollectionPage() {
    const navigate = useNavigate();
    const { userId, setId } = useParams();
    const [user, setUser] = useState(undefined);
    const [userCards, setUserCards] = useState([]);
    const [cardSet, setCardSet] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null); // Track selected card
    const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state

    useEffect(() => {
        getUser(userId)
            .then((data) => {
                setUser(data);
            })
            .catch(() => setUser(null));
        
        getSet(setId)
            .then((data) => {
                setCardSet(data[0]);
            })
            .catch(() => setCardSet(null));
    }, []);

    useEffect(() => {
        if (user) {
            getUserCards(userId)
                .then((data) => {
                    const filteredCards = data.filter(card => card.set.id === setId);
                    setUserCards(filteredCards);
                })
                .catch(() => setUserCards([]));
        }
    }, [user]);

    // Handle card click
    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    // Close modal function
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCard(null);
    };

    // Close modal when clicking outside the content
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            closeModal();
        }
    };

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
                                    <img 
                                        src={card.images.small} 
                                        alt={card.name} 
                                        className="card-image"
                                        onClick={() => handleCardClick(card)} // Open viewer
                                        style={{ cursor: "pointer" }} // Indicate clickable
                                    />
                                ) : (
                                    <div className="empty-slot">
                                        <span className="card-number">{index + 1}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {isModalOpen && selectedCard && (
                    <div className="modal-overlay" onClick={handleOverlayClick}>
                        <div className="modal-content">
                            <button className="close-button" onClick={closeModal}>✖</button>
                            <CardViewer imageUrl={selectedCard.images.large} />
                        </div>
                    </div>
                )}
            </div>
        ) : (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    );
}

export default CollectionPage;
