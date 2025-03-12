export const generatePositions = (count, minDistance) => {
    const positions = [];
    let attempts = 0;
    while (positions.length < count && attempts < 1000) {
      const top = Math.random() * 100; // valor entre 0 y 100%
      const left = Math.random() * 100;
      let valid = true;
      // Verifica que la nueva posición no esté demasiado cerca de las ya generadas
      for (let pos of positions) {
        const dist = Math.sqrt((top - pos.top) ** 2 + (left - pos.left) ** 2);
        if (dist < minDistance) {
          valid = false;
          break;
        }
      }
      if (valid) {
        positions.push({ top, left, delay: Math.random() * 4 }); // delay entre 0 y 4 segundos
      }
      attempts++;
    }
    return positions;
  };
  
  /**
   * Retorna una URL aleatoria para una pokeball.
   * Se asume que las imágenes están en public/images/pokeballs/ y se llaman pokeball1.png a pokeball15.png
   */
  export const getRandomImageUrl = () => {
    const num = Math.floor(Math.random() * 12) + 1;
    return `/images/pokeballs/pokeball${num}.png`;
  };