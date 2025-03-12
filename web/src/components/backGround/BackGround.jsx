import Pokeball from './Pokeball';
import { generatePositions, getRandomImageUrl } from '../../utils/pokeballUtils';
import { useMemo } from 'react';

const NUM_POKEBALLS = 60;
const MIN_DISTANCE = 10;
function BackGround() {
const positions = useMemo(
        () => generatePositions(NUM_POKEBALLS, MIN_DISTANCE),
        []
    ); 
return (
    <div className="background">
    {positions.map((pos, index) => (
    <Pokeball
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