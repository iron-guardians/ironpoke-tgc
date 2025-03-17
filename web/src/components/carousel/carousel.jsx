import React, { useState, useEffect } from "react";
import "./carousel.css";
import BoosterPack from "./booster-pack";
import Modal from 'react-modal';
import { openBoosterPack, addCards } from "../../services/api-service";
import Card3DViewer from "../card-visualizer/3d-viewer"; // Import the 3D viewer component

Modal.setAppElement('#root');

const Carousel = ({ boosterPacks }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [transitioning, setTransitioning] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPack, setSelectedPack] = useState(null);
    const [setCards, setSetCards] = useState([]);
    const [is3DViewerOpen, setIs3DViewerOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const prevSlide = () => {
        if (transitioning) return;
        setTransitioning(true);
        setActiveIndex((prev) => (prev - 1 + boosterPacks.length) % boosterPacks.length);
    };

    const nextSlide = () => {
        if (transitioning) return;
        setTransitioning(true);
        setActiveIndex((prev) => (prev + 1) % boosterPacks.length);
    };

    useEffect(() => {
        if (transitioning) {
            setTimeout(() => {
                setTransitioning(false);
            }, 500);
        }
    }, [activeIndex, transitioning]);

    const getDisplayPacks = () => {
        const prevIndex = (activeIndex - 1 + boosterPacks.length) % boosterPacks.length;
        const nextIndex = (activeIndex + 1) % boosterPacks.length;
        return [boosterPacks[prevIndex], boosterPacks[activeIndex], boosterPacks[nextIndex]];
    };

    const handlePackClick = async (pack) => {
        setSelectedPack(pack);
        setIsModalOpen(true);

        try {
            const fetchedSetCards = await openBoosterPack(pack.id);
            setSetCards(fetchedSetCards);

            await addCards(fetchedSetCards);
        } catch (error) {
            console.error("Error fetching booster pack data:", error);
        }
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIs3DViewerOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPack(null);
        setSetCards([]);
    };

    const close3DViewer = () => {
        setIs3DViewerOpen(false);
        setSelectedCard(null);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") close3DViewer();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="carousel-container">
            <div className="carousel">
                <button
                    className="carousel-button carousel-button-prev"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    disabled={transitioning}
                >
                    <i className="fas fa-chevron-left"></i>
                </button>

                <div className={`carousel-items ${transitioning ? 'transitioning' : ''}`}>
                    {getDisplayPacks().map((pack, index) => (
                        <div 
                            key={index} 
                            className={`carousel-item ${index === 1 ? 'active' : ''}`}
                        >
                            <BoosterPack data={pack} onClick={() => handlePackClick(pack)} />
                        </div>
                    ))}
                </div>

                <button
                    className="carousel-button carousel-button-next"
                    onClick={nextSlide}
                    aria-label="Next slide"
                    disabled={transitioning}
                >
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={(e) => e.target.classList.contains("modal-overlay") && closeModal()}>
                    <div className="modal-content">
                        <button className="close-button" onClick={closeModal}>✖</button>
                        <h2>Booster pack open!</h2>
                        <div className="obtained-cards-grid">
                            {setCards.length > 0 ? (
                                setCards.map((card, index) => (
                                    <div key={index} className="card-slot owned" onClick={() => handleCardClick(card)}>
                                        <img src={card.images.small} alt={`Card ${index}`} className="card-image" />
                                    </div>
                                ))
                            ) : (
                                <p>Loading cards...</p>
                            )}
                        </div>
                        <button className="continue-button" onClick={closeModal}>Continue</button>
                    </div>
                </div>
            )}

            {is3DViewerOpen && selectedCard && (
                <div className="modal-overlay" onClick={(e) => e.target.classList.contains("modal-overlay") && close3DViewer()}>
                    <div className="modal-content">
                        <button className="close-button" onClick={close3DViewer}>✖</button>
                        <Card3DViewer imageUrl={selectedCard.images.large} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carousel;