import Cards from './Cards';
import { generatePositions, getRandomImageUrl } from '../../utils/CardsUtils';
import { useMemo } from 'react';

const NUM_CARDS = 15;
const MIN_DISTANCE = 20;
function BackGround() {
const positions = useMemo(
        () => generatePositions(NUM_CARDS, MIN_DISTANCE),
        []
    ); 
return (
    <div className="background">
    {positions.map((pos, index) => (
    <Cards
        key={index}
        top={`${pos.top}%`}
        left={`${pos.left}%`}
        delay={`${pos.delay}s`}
        imageUrl={getRandomImageUrl()}
    />
    ))}
    </div>
);
};
export default BackGround;