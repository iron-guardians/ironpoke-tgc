import { useState } from "react";
import "./carousel.css"; // Asegúrate de crear este archivo y agregar los estilos

const Carousel = ({ images }) => {
  // Índice activo que representa la imagen central
  const [activeIndex, setActiveIndex] = useState(0);

  // Funciones para navegar
  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1) >= 0 ? prev - 1 : images.length -1);
    console.log(activeIndex);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
    console.log(activeIndex);
  };
  

  // Calcula índices de las imágenes lateral izquierda y derecha
  const prevIndex = (activeIndex - 1 + images.length) % images.length;
  const nextIndex = (activeIndex + 1) % images.length;

  return (
    <div className="coverflow-container  d-flex flex-column align-items-center justify-content-center">
      <div className="coverflow-carousel d-flex align-items-center">
        {/* Botón para ir a la imagen anterior (solo se muestra en PC) */}
        <button className="btn btn-secondary d-none d-md-block coverflow-nav-button coverflow-nav-button-prev" onClick={prevSlide}>
          Prev
        </button>
  
        {/* Contenedor del carrusel */}
        <div className="coverflow-container">
          {/* Imagen lateral izquierda */}
          <div className="coverflow-item coverflow-prev">
            <img src={images[prevIndex]} alt={`Slide ${prevIndex}`} />
          </div>
          {/* Imagen central */}
          <div className="coverflow-item coverflow-active">
            <img src={images[activeIndex]} alt={`Slide ${activeIndex}`} />
          </div>
          {/* Imagen lateral derecha */}
          <div className="coverflow-item coverflow-next">
            <img src={images[nextIndex]} alt={`Slide ${nextIndex}`} />
          </div>
        </div>
  
        {/* Botón para ir a la siguiente imagen (solo se muestra en PC) */}
        <button className="btn btn-secondary d-none d-md-block coverflow-nav-button coverflow-nav-button-next" onClick={nextSlide}>
          Next
        </button>
  
        {/* Botones para vista móvil: se muestran solo en pantallas pequeñas */}
        <div className="d-flex d-md-none coverflow-nav-buttons">
          <button className="btn btn-secondary coverflow-nav-button coverflow-nav-button-prev" onClick={prevSlide}>
            Prev
          </button>
          <button className="btn btn-secondary coverflow-nav-button coverflow-nav-button-next" onClick={nextSlide}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carousel;