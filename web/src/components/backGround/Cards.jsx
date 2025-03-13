function Cards({ top, left, delay, imageUrl }) {
  const containerStyle = {
    position: "absolute", // Asegúrate que el contenedor padre tenga position: relative
    top,
    left,
    animationDelay: delay,
  };

  const cardsStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'contain', // Se ajusta sin recortar
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="cards-container" style={containerStyle}>
      <div className="cards" style={cardsStyle} />
    </div>
  );
}

export default Cards;