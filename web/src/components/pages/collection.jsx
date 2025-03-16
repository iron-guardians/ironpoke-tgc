import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, getSet, getUserCards } from "../../services/api-service";
import CardViewer from "../card-visualizer/3d-viewer";
import "./collection.css";
import { PageLayout } from "../layouts";

function CollectionPage() {
    const navigate = useNavigate();
    const { userId, setId } = useParams();
    const [user, setUser] = useState(undefined);
    const [userCards, setUserCards] = useState([]);
    const [cardSet, setCardSet] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getUser(userId).then(setUser).catch(() => setUser(null));
        getSet(setId).then((data) => setCardSet(data[0])).catch(() => setCardSet(null));
    }, [userId, setId]);

    useEffect(() => {
        if (user) {
            getUserCards(userId)
                .then((data) => setUserCards(data.filter(card => card.set.id === setId)))
                .catch(() => setUserCards([]));
        }
    }, [user]);

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCard(null);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") closeModal();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const collectedCount = userCards.length;
    const totalCount = cardSet ? cardSet.total : 0;
    const progressPercentage = totalCount ? (collectedCount / totalCount) * 100 : 0;

    return (
        <PageLayout>
            {user && cardSet ? (
                <div className="collection-page">
                    <div className="set-logo-container">
                        <img 
                            onClick={() => navigate(`/profile/${user.id}`)} 
                            src={cardSet.images?.logo} 
                            alt={setId} 
                            className="set-logo"
                        />
                        <div className="progress-info">
                            <p>{collectedCount} / {totalCount} cards collected</p>
                            <div className="progress-bar-container">
                                <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-grid-container">
                        <div className="card-grid">
                            {Array.from({ length: cardSet.total }).map((_, index) => {
                                const card = userCards.find(c => c.number === String(index + 1));
                                return (
                                    <div key={index} className={`card-slot ${card ? "owned" : "empty"}`}>
                                        {card ? (
                                            <img 
                                                src={card.images.small} 
                                                alt={card.name} 
                                                className="card-image"
                                                onClick={() => handleCardClick(card)}
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
                    </div>

                    {userCards.length === 0 && (
                        <div className="no-cards-message">
                            <p>No tienes cartas en esta colección aún.</p>
                        </div>
                    )}

                    {isModalOpen && selectedCard && (
                        <div className="modal-overlay" onClick={(e) => e.target.classList.contains("modal-overlay") && closeModal()}>
                            <div className="modal-content">
                                <button className="close-button" onClick={closeModal}>✖</button>
                                <CardViewer imageUrl={selectedCard.images.large} />
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="loading-message">
                    <h1>Cargando...</h1>
                </div>
            )}
        </PageLayout>
    );
}

export default CollectionPage;