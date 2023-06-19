import './SearchPage.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const MIL = 1000;
const QUATRO = 4;

export default function SearchPage() {
  const [search, setSearch] = useState('');
  const [arrAnimes, setAnimesArr] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [numberOver, setNumberOver] = useState(null);
  const [dataForPagination, setDataForPagination] = useState([]);

  const arrOfAnimesSliced = arrAnimes.slice(0, QUATRO);
  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };
  const timerRef = React.useRef(null);

  const handleSearch = async (value) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${value}&nsfw
    `);
    const data = await response.json();
    setDataForPagination(data);
    setAnimesArr(data.data);
  };

  useEffect(() => {
  }, [arrAnimes]);
  const handleChange = (event) => {
    clearTimeout(timerRef.current);
    const { value } = event.target;
    setSearch(value);
    timerRef.current = setTimeout(() => {
      handleSearch(value);
      clearTimeout(timerRef.current);
    }, MIL);
  };

  return (
    <div>
      <Header />
      <div className="animeListContainer">
        <input
          type="text"
          placeholder="Search anime"
          value={ search }
          onChange={ handleChange }
          className="animeSearchInput"
        />
        <div className="animeSearchColumn">
          {search.length > 0 && arrOfAnimesSliced.map((anime, index) => (
            <Link
              key={ anime.mal_id }
              className={ isHovered && numberOver === index ? 'biggerImgContainer'
                : 'imageContainer' }
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

        </div>

        {search.length > 0 && arrAnimes.length > 5
        && (
          <div className="linkToMore">
            <p>View all results for:</p>
            <Link
              to={ { pathname: `/Anime Search/${search}`, state: dataForPagination,
              } }
            >
              {search}

            </Link>
          </div>)}

      </div>
      <Footer />
    </div>
  );
}
