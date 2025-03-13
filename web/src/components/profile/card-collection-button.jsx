import './card-collection-button.css';
import { useNavigate } from "react-router-dom";

function CardCollectionButton({ userId, userCards, set }) {
    const navigate = useNavigate();

    const handleClicked = () => {
        navigate(`/profile/${userId}/collection/${set.id}`);
    }

    const cardCount = userCards.filter(card => card.set.id === set.id).length;

    return (
        <button onClick={handleClicked} className="card-collection-button w-100 mt-4 p-3" style={{ maxWidth: '400px' }}>
            <img src={set.images.logo} alt={set.name} className="img-fluid" />
            <h2 className="h5 fw-bold">{set.name}</h2>
            <p className="text-muted">{cardCount} / {set.total}</p>
        </button>
    );
}

export default CardCollectionButton;