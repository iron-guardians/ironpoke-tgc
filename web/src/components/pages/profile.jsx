import { useEffect, useState } from "react";
import { ProfileHeader, CardCollectionButton } from "../profile/";
import { useParams, useNavigate } from "react-router-dom";
import { profile, getUser, getUserCards } from "../../services/api-service";
import "./profile.css";
import { PageLayout } from "../layouts";

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
        <PageLayout>
            {(user && userCards) ? (
                <div className="profile-page-container">
                    {/* Fixed Profile Header */}
                    <div className="profile-header-wrapper">
                        <ProfileHeader user={user} />
                    </div>

                    {/* Scrollable Card Collection */}
                    <div className="profile-content">
                        <div className="profile-card-sets-wrapper">
                            {cardSets.length > 0 ? (
                                <div className="profile-card-sets-container">
                                    {cardSets.map((set) => (
                                        <CardCollectionButton 
                                            userId={user.id} 
                                            userCards={userCards} 
                                            set={set} 
                                            key={set.id} 
                                            className="card-collection-button"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="no-cards-message">No card sets available.</div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="loading-container">
                    <div className="spinner">Loading...</div>
                </div>
            )}
        </PageLayout>
    );
}

export default ProfilePage;
