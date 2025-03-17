import { useEffect, useRef } from 'react';
import './imagenCarga.css'; // Importa el CSS exclusivo para este componente

const ImagenCarga = () => {
  const containerRef = useRef(null);
  const imagePath = '/images/pokeballs/pokeball12.png'; // Ruta de la imagen (asegúrate de tener este recurso)

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spacing = 60;      // Horizontal space between pokeballs
    const ballSize = 50;     // Assumed width/height of the pokeball image
    const speed = 200;       // Pixels per second (so 60px in 0.3s)

    // Helper function to create a pokeball at a given left position
    const createBall = (left) => {
      const img = document.createElement('img');
      img.src = imagePath;
      img.alt = 'Imagen de carga';
      const topPos = (container.clientHeight - ballSize) / 2; // Center vertically
      img.style.top = `${topPos}px`;
      img.style.position = 'absolute';
      img.style.left = `${left}px`;
      container.appendChild(img);
    };

    // Initialize container with the first pokeball at the left edge
    container.innerHTML = '';
    createBall(0);

    // Interval for creating new pokeballs every 300ms
    const creationInterval = setInterval(() => {
      const children = Array.from(container.children);
      if (children.length === 0) {
        createBall(0);
        return;
      }
      const lastBall = children[children.length - 1];
      const lastLeft = parseFloat(lastBall.style.left);
      const newLeft = lastLeft + spacing;

      // If the new ball would be painted outside the container (to the right), reset the container
      if (newLeft + ballSize > container.clientWidth) {
        container.innerHTML = '';
        createBall(0);
      } else {
        createBall(newLeft);
      }
    }, 300);

    // Animation loop: move all pokeballs to the right continuously
    let animationFrameId;
    let lastTime = null;
    const animate = (time) => {
      if (lastTime === null) {
        lastTime = time;
      }
      const delta = time - lastTime;
      lastTime = time;

      const children = Array.from(container.children);
      children.forEach(child => {
        let currentLeft = parseFloat(child.style.left);
        // Move right by an amount proportional to the elapsed time
        currentLeft += speed * (delta / 1000);
        child.style.left = `${currentLeft}px`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(creationInterval);
    };
  }, []);

  return <div className="loading-container" ref={containerRef}></div>;
};

export default ImagenCarga;