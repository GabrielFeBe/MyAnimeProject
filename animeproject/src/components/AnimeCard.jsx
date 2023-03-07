import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const FIVE = 5;
const TWENTY = 20;

export default function AnimeCard({ seasonAnimes, animePropsStatus }) {
  const [itemIndex, setItemIndex] = useState(0);
  const carouselRef = useRef(null);

  const handlePrevClick = () => {
    setItemIndex((itemIndex - FIVE + seasonAnimes.length) % seasonAnimes.length);
    carouselRef.current.style.transform = `translateX(-${(itemIndex - FIVE) * TWENTY}%)`;
  };

  const handleNextClick = () => {
    setItemIndex((itemIndex + FIVE) % seasonAnimes.length);
    carouselRef.current.style.transform = `translateX(-${(itemIndex + FIVE) * TWENTY}%)`;
  };

  return (
    <div className="carousel">
      <h2>{animePropsStatus}</h2>
      <div
        className="carousel-items"
        ref={ carouselRef }
        style={ { transform: `translateX(-${itemIndex * TWENTY}%)` } }
      >
        {seasonAnimes.map((anime, i) => (

          <Link
            to={ { pathname: `/animepage/${anime.title}`, state: { anime } } }
            className="carousel-item"
            key={ i }
          >
            <img
              src={ anime.images.jpg.image_url }
              alt="anime"
              className="animeCard"
            />

            <p>{anime.title}</p>

          </Link>

        ))}

      </div>
      <button className="prev-btn" onClick={ handlePrevClick }>&#8249;</button>
      <button className="next-btn" onClick={ handleNextClick }>&#8250;</button>
    </div>
  );
}
