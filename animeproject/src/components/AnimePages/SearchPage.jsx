import './SearchPage.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimeCard from '../AnimeCard';
import Header from '../Header';

const MIL = 1000;
const QUATRO = 4;

export default function SearchPage({ location: { pathname } }) {
  const [search, setSearch] = useState('');
  const [arrAnimes, setAnimesArr] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [numberOver, setNumberOver] = useState(null);
  const [dataForPagination, setDataForPagination] = useState([]);
  console.log(pathname);

  const arrOfAnimesSliced = arrAnimes.slice(0, QUATRO);
  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };
  const timerRef = React.useRef(null);

  const handleSearch = async (value) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${value}&nsfw&order_by=scored_by&sort=desc
    `);
    const data = await response.json();
    // console.log(data);
    setDataForPagination(data);
    setAnimesArr(data.data);
  };

  useEffect(() => {
    console.log('tijas o rato');
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
        <div>
          {search.length > 0 && arrOfAnimesSliced.map((anime, index) => {
            if (pathname === '/Anime Search') {
              return (
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
              );
            }
            return console.log('tijasgay');
          })}

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
      {arrAnimes.length > 1
        && <AnimeCard animePropsStatus="Animes Buscados" seasonAnimes={ arrAnimes } />}
    </div>
  );
}
