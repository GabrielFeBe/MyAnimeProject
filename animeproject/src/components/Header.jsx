import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeSearch from './HomeSearch';
import '../App.css';

const MIL = 1000;
export default function Header() {
  const arrayListAnime = ['Anime Search', 'Top Anime', 'Seasonal Anime',
    'Recommendation'];
  const arrayListManga = ['Manga Search', 'Top Manga'];
  const arrayIndustry = ['Character', 'People'];
  const [displayListAnime, setDisplayListAnime] = useState('displayNone');
  const [displayListManga, setDisplayListManga] = useState('displayNone');
  const [displayIndustry, setDisplayIndustry] = useState('displayNone');
  const [searchInput, setSearchInput] = useState('');
  const [searchArr, setSearchArr] = useState([]);
  const [selectValue, setSelectValue] = useState('Anime');
  const [inputFocus, setInputFocus] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  const timerRef = useRef(null);
  const handleSearch = async (value) => {
    if (value.length === 0) return setSearchArr([]);
    if (selectValue === 'Anime') {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${value}&nsfw&limit=10&min_score=1`);
      const data = await response.json();
      setSearchArr(data.data);
    } else {
      const response = await fetch(`https://api.jikan.moe/v4/manga?q=${value}&nsfw&limit=10&min_score=1`);
      const data = await response.json();
      setSearchArr(data.data);
    }
  };

  const handleChange = (target) => {
    clearTimeout(timerRef.current);
    const { value } = target;
    timerRef.current = setTimeout(() => {
      handleSearch(value);
      clearTimeout(timerRef.current);
    }, MIL);
  };

  return (
    <header>

      <div className="imageBoxHeader">
        <h1 className="myAnimeHeader"><Link to="/">MyAnimeProject</Link></h1>
        {/* <img src="https://img.freepik.com/premium-photo/anime-art-style-environment-background-image_492154-389.jpg" className="backGroundHeaderImage" alt="" /> */}
      </div>
      <div className="headerBottomBox">
        <div className="navBar parent-element">
          <div className="dropdown">
            <button
              onMouseEnter={ () => { setDisplayListAnime('displayBlock'); } }
              onMouseLeave={ () => { setDisplayListAnime('displayNone'); } }
              className="dropbtn"
            >
              Anime
            </button>
            <div
              className={ `dropdown-content ${displayListAnime}` }
              onMouseLeave={ () => { setDisplayListAnime('displayNone'); } }
              onMouseEnter={ () => { setDisplayListAnime('displayBlock'); } }
            >
              { arrayListAnime.map((page) => (
                <Link
                  to={ `/${page}` }
                  key={ page }
                  className="linkToPage"
                >
                  {page}

                </Link>
              ))}

            </div>
          </div>
          <div className="dropdown">
            <button
              onMouseLeave={ () => { setDisplayListManga('displayNone'); } }
              onMouseEnter={ () => { setDisplayListManga('displayBlock'); } }
              className="dropbtn"
            >
              Manga
            </button>
            <div
              className={ `dropdown-content ${displayListManga}` }
              onMouseLeave={ () => { setDisplayListManga('displayNone'); } }
              onMouseEnter={ () => { setDisplayListManga('displayBlock'); } }
            >
              {arrayListManga.map((page) => (
                <Link key={ page } to={ `/${page}` } className="navLink">
                  {page}
                </Link>))}
            </div>
          </div>
          <div className="dropdown">
            <button
              onMouseLeave={ () => { setDisplayIndustry('displayNone'); } }
              onMouseEnter={ () => { setDisplayIndustry('displayBlock'); } }
              className="dropbtn"
            >
              Industry
            </button>
            <div
              className={ `dropdown-content ${displayIndustry}` }
              onMouseLeave={ () => { setDisplayIndustry('displayNone'); } }
              onMouseEnter={ () => { setDisplayIndustry('displayBlock'); } }
            >
              {arrayIndustry.map((page) => (
                <Link key={ page } to={ `/${page}` } className="navLink">
                  {page}
                </Link>))}
            </div>
          </div>
        </div>
        <div className="searchSection">
          <select
            className="selectAorM"
            name=""
            id=""
            value={ selectValue }
            onChange={ ({ target }) => {
              setSelectValue(target.value);
              setSearchInput('');
              setSearchArr([]);
            } }
          >
            <option value="Anime">Anime</option>
            <option value="Manga">Manga</option>

          </select>
          <input
            className="headerSearch"
            type="text"
            value={ searchInput }
            onChange={ ({ target }) => {
              setSearchInput(target.value);
              handleChange(target);
            } }
            onFocus={ () => setInputFocus(true) }
            onBlur={ () => {
              setInputFocus(false);
            } }
            placeholder="Search Anime, Manga and more..."
          />
          { (inputFocus || mouseOver) && searchInput.length > 0 ? <HomeSearch
            type={ selectValue }
            searchArr={ searchArr }
            mouseOver={ setMouseOver }

          /> : <p />}
        </div>
      </div>

    </header>
  );
}
