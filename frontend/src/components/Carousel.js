import React,{useState,useEffect} from "react";
// Carousel Component
const Carousel = ({ images, autoPlay = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length, autoPlay]);

  return (
    <div className="carousel">
      <img src={images[currentIndex]} className="carousel-image" loading="lazy" alt="Carousel" />
    </div>
  );
};

export default Carousel