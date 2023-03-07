import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Header() {
  const arrayListAnime = ['Anime Search', 'Top Anime', 'Seasonal Anime', 'Reviews'];
  const arrayListManga = ['Manga Search', 'Top Manga', 'Reviews'];
  const [displayListAnime, setDisplayListAnime] = useState('displayNone');
  const [displayListManga, setDisplayListManga] = useState('displayNone');
  return (
    <header>
      <h1><Link to="/">MyAnimeProject</Link></h1>
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
              {arrayListAnime.map((page) => (
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
            <button className="dropbtn">
              Community
            </button>
          </div>
          <div className="dropdown"><button className="dropbtn">Industry</button></div>
        </div>
        <div className="searchSection">
          <select name="" id="">
            <option value="">All</option>

          </select>
          <input type="text" placeholder="Search Anime, Manga and more..." />
        </div>
      </div>
    </header>
  );
}
