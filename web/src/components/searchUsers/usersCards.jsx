function UserCard({user}) {
  const totalCards = 1000;
  const userCards = 300; // ejemplo: el usuario tiene 100 cartas
  const percentage = Math.round((userCards / totalCards) * 100);
  return (
    <div className="card mb-3 shadow-sm user-card bg-white">
    <div className="card-body d-flex align-items-center flex-wrap">
      {/* Imagen en círculo a la izquierda */}
      <div className="me-3 mb-3 mb-md-0">
          <img 
            src="https://as2.ftcdn.net/v2/jpg/09/87/15/11/1000_F_987151194_Hx962ROv3DeFutSuk1yFpxfMXxDz8Blx.jpg" 
            alt="Profile" 
            className="rounded-circle"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
          />
        </div>
      {/* Información a la derecha */}
      <div className="flex-grow-1 m-4">
          <h4 className="mb-1">Name</h4>
          <p className="mb-2 text-muted">Example Name</p>
          <h4 className="mb-1">Number of Cards</h4>
          <p className="mb-0 text-muted">300/1000</p>
            {/* Barra de progreso */}
          <div className="progress mt-2" style={{ height: '20px' }}>
          <div 
            className="progress-bar bg-success" 
            role="progre ssbar" 
            style={{ width: `${percentage}%` }} 
            aria-valuenow={percentage} 
            aria-valuemin="0" 
            aria-valuemax="100"
          >
            {percentage}%
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserCard;