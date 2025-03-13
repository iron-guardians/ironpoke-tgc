import { useEffect } from "react";
import { PageLayout } from "../layouts";
import { 
    ProfileHeader,
    CardCollectionButton,
} from "../profile/";

import { useState } from "react";
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

    useEffect(() => async () => {
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

            const cards = await getUserCards(user.id);
            setUserCards(cards);

            // Extract unique card sets
            // PETA POR ESTA PUTA LINEA
            const uniqueSets = new Map();
            cards.forEach(card => {
                if (!uniqueSets.has(card.set.id)) {
                    uniqueSets.set(card.set.id, card.set);
                }
            });
            setCardSets([...uniqueSets.values()]);
        } catch (error) {
            if (isOwnProfile) {
                navigate("/login");
            } else {
                navigate("/404");
            }
        }
    }, [userId]);

    return (
        user ? (
                <div className="profile-page-container">
                    {/* Fixed Profile Header */}
                    <ProfileHeader user={user} className="profile-header-container" />
                    
                    {/* Scrollable Card Collection */}
                    <div className="profile-content">
                        <div className="profile-card-sets-container">
                            {cardSets.map((set) => (
                                <CardCollectionButton userId={user.id} userCards = {userCards} set={set} className="" key={set.id} />
                            ))}
                        </div>
                    </div>
                </div>
        ) : (
            <div>Loading...</div>
        )
    );
    
    
}

export default ProfilePage;