export const generatePositions = (count, minDistance) => {
    const positions = [];
    let attempts = 0;
    
    while (positions.length < count && attempts < 1000) {
      const top = Math.random() * 100; // value between 0 and 100%
      const left = Math.random() * 100;
      let valid = true;

      // Check that the new position is not too close to the ones already generated
      for (let pos of positions) {
        const dist = Math.sqrt((top - pos.top) ** 2 + (left - pos.left) ** 2);
        if (dist < minDistance) {
          valid = false;
          break;
        }
      }
      if (valid) {
        positions.push({ top, left, delay: Math.random() * 4 }); // delay between 0 and 4 seconds
      }
      attempts++;
    }
    return positions;
  };
  
  /*
    Returns a random URL for a pokeball.
    The images are assumed to be in public/images/pokeballs/ and are named pokeball1.png through pokeball15.png
   */
  export const getRandomImageUrl = () => {
    const num = Math.floor(Math.random() * 39) + 1;
    return `/images/cards/card${num}.webp`;
  };