
import { useState } from "react";
import "./Carousel.css"; // Asegúrate de crear este archivo y agregar los estilos

const Carousel = ({ images }) => {
  // Índice activo que representa la imagen central
  const [activeIndex, setActiveIndex] = useState(0);

  // Funciones para navegar
  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  // Calcula índices de las imágenes lateral izquierda y derecha
  const prevIndex = (activeIndex - 1 + images.length) % images.length;
  const nextIndex = (activeIndex + 1) % images.length;

  return (
    <div className="coverflow-carousel container d-flex flex-column align-items-center justify-content-center">
      <div className="d-flex align-items-center">
        {/* Botón para ir a la imagen anterior */}
        <button className="btn btn-secondary me-3" onClick={prevSlide}>
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

        {/* Botón para ir a la siguiente imagen */}
        <button className="btn btn-secondary ms-3" onClick={nextSlide}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;