function ProfileHeader({user, className}) {
    return (
        <div className={className}>
            <div className="card w-100 mt-4 shadow-sm">
                <div className="d-flex align-items-center gap-3">
                    <img src={user.avatar} className="rounded-circle bg-secondary" style={{ width: '60px', height: '60px' }}></img>
                        <div>
                            <p className="fw-semibold mb-1">{user.name}</p>
                            <p className="text-muted small">{user.cardsCollection.length} cards.</p>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default ProfileHeader;