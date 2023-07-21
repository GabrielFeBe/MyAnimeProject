import '../AnimePages/SearchPage.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import LetterSearch from '../LetterSearch';
import SearchPageLetters from '../SearchPageLetters';

const MIL = 1000;
const QUATRO = 4;
const CINCO = 5;

export default function MangaSearch() {
  const [search, setSearch] = useState('');
  const [arrAnimes, setAnimesArr] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [numberOver, setNumberOver] = useState(null);
  const [arraySearch, setArraySearchManga] = useState([]);

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
    const response = await fetch(`https://api.jikan.moe/v4/manga?q=${value}&nsfw
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
      <LetterSearch setArraySearchManga={ setArraySearchManga } />
      <div className="animeListContainer">
        <div className="relativeSearchPage">

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

            {search.length > 0 && arrAnimes.length > CINCO
        && (
          <div className="linkToMore">
            <p>View all results for:</p>
            <Link
              to={ { pathname: `/Manga Search/${search}`, state: dataForPagination,
              } }
            >
              {search}

            </Link>
          </div>)}

          </div>

        </div>

      </div>
      <SearchPageLetters arraySearch={ arraySearch.data || [] } type="manga" />
      <Footer />
    </div>
  );
}
