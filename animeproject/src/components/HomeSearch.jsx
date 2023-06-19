import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomeSearch.css';

export default function HomeSearch(prop) {
  const [isHovered, setIsHovered] = useState(false);
  const [numberOver, setNumberOver] = useState(null);
  const { type, searchArr, mouseOver } = prop;

  const handleMouseOver = () => {
    setIsHovered(true);
  };
  const handleMouseOut = () => {
    setIsHovered(false);
  };
  return (
    <div
      onMouseEnter={ () => mouseOver(true) }
      onMouseLeave={ () => mouseOver(false) }
    >
      {type === 'Anime'
        ? (
          <div className="absolute">
            {searchArr.map((anime, index) => (
              <Link
                key={ anime.mal_id }
                className={ isHovered && numberOver === index ? 'homeBigImgContainer'
                  : 'homeimageContainer' }
                to={ { pathname: `/animepage/${anime.title}`, state: { anime } } }
                onMouseOver={ () => {
                  handleMouseOver();
                  setNumberOver(index);
                } }
                onMouseLeave={ () => {
                  handleMouseOut();
                  setNumberOver(null);
                } }
              >
                <img src={ anime.images.jpg.small_image_url } alt="" />
                <div className="textContainer">
                  <span>{anime.title}</span>
                  <span className="lilDescription">
                    {`(${anime.type} , ${anime.year} )`}
                  </span>
                  <div
                    className={ isHovered && numberOver === index ? 'block' : 'hidden' }
                  >
                    {`Aired: ${anime.aired.string}`}
                    <br />
                    {`Score: ${anime.score}`}
                    <br />
                    {`Status: ${anime.status}`}
                  </div>
                </div>
              </Link>
            ))}

          </div>)

        : (
          <div className="absolute">
            {searchArr.map((anime, index) => (
              <Link
                key={ anime.mal_id }
                className={ isHovered && numberOver === index ? 'homeBigImgContainer'
                  : 'homeimageContainer' }
                to={ { pathname: `/mangapage/${anime.title}`, state: { anime } } }
                onMouseOver={ () => {
                  handleMouseOver();
                  setNumberOver(index);
                } }
                onMouseLeave={ () => {
                  handleMouseOut();
                  setNumberOver(null);
                } }
              >
                <img src={ anime.images.jpg.small_image_url } alt="" />
                <div className="textContainer">
                  <span>{anime.title}</span>
                  <span className="lilDescription">
                    {`(${anime.type})`}
                  </span>
                  <div
                    className={ isHovered && numberOver === index ? 'block' : 'hidden' }
                  >
                    {`Published: ${anime.published.string}`}
                    <br />
                    {`Score: ${anime.score}`}
                    <br />
                    {`Status: ${anime.status}`}
                  </div>
                </div>
              </Link>
            ))}

          </div>)}

    </div>
  );
}
