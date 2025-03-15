
function UserCard({user}) {
  const totalCards = 1000;
  const userCards =user.cardsCollection.length; // Example: the user has 100 cards
  const percentage = Math.round((userCards / totalCards) * 100);

  return (
    <div className="card mb-3 shadow-sm user-card bg-white">
    <div className="card-body d-flex align-items-center flex-wrap">

      {/* Image circled on the left */}
      <div className="me-3 mb-3 mb-md-0">
          <img 
            src={user.avatar} 
            alt="Profile" 
            className="rounded-circle"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
          />
        </div>

      {/* Information on the right */}
      <div className="flex-grow-1 m-4">
          <h4 className="mb-2 text-muted">{user.name}</h4>
          <h4 className="mb-1">Number of Cards</h4>
          <p className="mb-0 text-muted">{userCards} Cards</p>
            {/* Progress bar */}
          <div className="progress mt-2" style={{ height: '20px' }}>
          <div 
            className="progress-bar bg-success" 
            role="progress bar" 
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