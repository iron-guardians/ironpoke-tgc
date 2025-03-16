import { useEffect, useState } from "react";
import { ProfileHeader, CardCollectionButton } from "../profile/";
import { useParams, useNavigate } from "react-router-dom";
import { profile, getUser, getUserCards } from "../../services/api-service";
import "./profile.css";

function ProfilePage() {
    const { userId } = useParams();
    const [user, setUser] = useState(undefined);
    const [userCards, setUserCards] = useState([]);
    const [cardSets, setCardSets] = useState([]);
    const isOwnProfile = userId === "me";

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                let user;
                if (isOwnProfile) {
                    user = await profile();
                } else if (userId) {
                    user = await getUser(userId);
                } else {
                    navigate("/404");
                    return;
                }
                setUser(user);
            } catch (error) {
                if (isOwnProfile) {
                    navigate("/login");
                } else {
                    navigate("/404");
                }
            }
        };

        fetchUserData();
    }, [userId, isOwnProfile, navigate]);

    useEffect(() => {
        const fetchUserCards = async () => {
            if (user) {
                document.title = `Profile | ${user.name}`;

                try {
                    const cards = await getUserCards(user.id);
                    setUserCards(cards);

                    const uniqueSets = new Map();
                    cards.forEach(card => {
                        if (!uniqueSets.has(card.set.id)) {
                            uniqueSets.set(card.set.id, card.set);
                        }
                    });
                    setCardSets([...uniqueSets.values()]);
                } catch (error) {
                    console.error("Error fetching user cards:", error);
                }
            }
        };

        fetchUserCards();
    }, [user]);

    return (
        user && userCards ? (
            <div className="profile-page-container">
                {/* Fixed Profile Header */}
                <ProfileHeader user={user} className="profile-header-container" />
                
                {/* Scrollable Card Collection */}
                <div className="profile-content">
                    <div className="profile-card-sets-container">
                        {cardSets.map((set) => (
                            <CardCollectionButton userId={user.id} userCards={userCards} set={set} className="" key={set.id} />
                        ))}
                    </div>
                </div>
                                <button 
                    type="button" 
                    className="btn btn-outline-success btn-hover-success" 
                    onClick={() => navigate("/")}
                    >
                    <i className="fa fa-arrow-left"></i> BACK
                    </button>
            </div>
        ) : (
            <div>Loading...</div>
        )
    );
}

export default ProfilePage;