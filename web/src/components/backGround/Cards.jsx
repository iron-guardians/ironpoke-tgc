function Cards({ top, left, delay, imageUrl }) {
  const containerStyle = {
    position: "absolute", // Make sure the parent container has position: relative
    top,
    left,
    animationDelay: delay,
  };

  const cardsStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'contain', // Fits without trimming
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="cards-container" style={containerStyle}>
      <div className="cards" style={cardsStyle} />
    </div>
  );
}

export default Cards;