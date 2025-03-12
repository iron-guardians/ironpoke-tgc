function Pokeball ({ top, left, delay, imageUrl }){
  const style = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'contain', // Se ajusta sin recortar
    backgroundRepeat: 'no-repeat',
    top,
    left,
    animationDelay: delay,
  };

  return <div className="pokeball" style={style} />;
};

export default Pokeball;