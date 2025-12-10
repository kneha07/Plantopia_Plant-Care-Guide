import { useState } from 'react';
import './Carousel.css';

function Carousel({ items, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handlePrev() {
    setCurrentIndex(prev =>
      prev === 0 ? items.length - 1 : prev - 1
    );
  }

  function handleNext() {
    setCurrentIndex(prev =>
      prev === items.length - 1 ? 0 : prev + 1
    );
  }

  function handleDotClick(index) {
    setCurrentIndex(index);
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  }

  const currentItem = items[currentIndex];

  return (
    <div
      className="carousel"
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={title || 'Image carousel'}
      aria-roledescription="carousel"
    >
      <div className="carousel-container">
        <button
          className="carousel-btn carousel-btn-prev"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div
          className="carousel-slide"
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${currentIndex + 1} of ${items.length}: ${currentItem.name}`}
        >
          <div className="carousel-image-wrapper">
            <img
              src={currentItem.image}
              alt={`${currentItem.name} (${currentItem.scientificName}) - ${currentItem.description.split('.')[0]}`}
              className="carousel-image"
            />
          </div>
          <div className="carousel-content">
            <h3 className="carousel-title">{currentItem.name}</h3>
            <p className="carousel-scientific">{currentItem.scientificName}</p>
            <p className="carousel-description">{currentItem.description}</p>
            <div className="carousel-traits">
              <span className="carousel-trait">
                <span aria-hidden="true">☀️</span> {currentItem.lightLabel}
              </span>
              <span className="carousel-trait">
                <span aria-hidden="true">💧</span> {currentItem.waterLabel}
              </span>
              <span className={`carousel-difficulty carousel-difficulty-${currentItem.difficulty}`}>
                {currentItem.difficultyLabel}
              </span>
            </div>
          </div>
        </div>

        <button
          className="carousel-btn carousel-btn-next"
          onClick={handleNext}
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <div className="carousel-indicators">
        <div className="carousel-dots" role="tablist" aria-label="Slide controls">
          {items.map((item, index) => (
            <button
              key={index}
              className={`carousel-dot ${currentIndex === index ? 'is-active' : ''}`}
              onClick={() => handleDotClick(index)}
              role="tab"
              aria-selected={currentIndex === index}
              aria-label={`Go to slide ${index + 1}: ${item.name}`}
            />
          ))}
        </div>
        <p className="carousel-counter">
          {currentIndex + 1} of {items.length}
        </p>
      </div>
    </div>
  );
}

export default Carousel;