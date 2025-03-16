
import { useNavigate } from 'react-router-dom';
import './usersCards.css';


function UserCard({user}) {

  
  const navigate = useNavigate();
  const totalCards = 1000;
  const userCards =user.cardsCollection.length; // ejemplo: el usuario tiene 100 cartas
  return (
    <div onClick={() => navigate(`/profile/${user.id}`)} className="card mb-3 shadow-sm user-card bg-white user-card">
      <div className="card-body d-flex align-items-center flex-wrap">
        {/* Imagen en círculo a la izquierda */}
        <div className="me-3 mb-3 mb-md-0">
            <img 
              src={user.avatar} 
              alt="Profile" 
              className="rounded-circle"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
            />
          </div>
        {/* Información a la derecha */}
        <div className="flex-grow-1 m-4">
            <h4 className="mb-2 text-muted">{user.name}</h4>
            <p className="mb-0 text-muted">{userCards} Cards</p>
          </div>
        </div>
    </div>
  );
}
export default UserCard;