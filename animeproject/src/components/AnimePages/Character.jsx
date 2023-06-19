import React, { useEffect, useState } from 'react';
import PageLoader from '../../PageLoader';
import Footer from '../Footer';
import Header from '../Header';
import './Character.css';

export default function Character() {
  const [currPage, setCurrPage] = useState(1);
  const [arrayOfCharacters, setArrayOfCharacters] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTopCharacter = async () => {
      setLoading(true);
      const response = await fetch(`https://api.jikan.moe/v4/top/characters?page=${currPage}`);
      const data = await response.json();
      console.log(data);
      setArrayOfCharacters(data.data);
      setPagination(data.pagination);
      setLoading(false);
    };
    fetchTopCharacter();
  }, [currPage]);
  if (loading) return <PageLoader />;
  return (
    <div>
      <Header />
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Character</th>
            <th>
              Nicknames
            </th>
            <th>Favorites</th>
          </tr>
        </thead>
        <tbody>
          { !loading && arrayOfCharacters.map((topCharacter, i) => {
            const { mal_id: malId, favorites, name,
              name_kanji: japName, nicknames, url, images:
              { jpg: { image_url: imageUrl } },
            } = topCharacter;
            const favoritesLastThree = favorites.toString().slice(-3);
            const withoutLastThree = favorites.toString()
              .split('').slice(0, -3).join('');
            const joinedFavorite = [withoutLastThree, favoritesLastThree].join('.');
            return (
              <tr key={ malId }>
                <td className="rankNumber">{(i + 1) + (+currPage - 1) * 25 }</td>
                <td className="titleContainer">
                  <a
                    className="notButton"
                    href={ url }
                  >
                    <img src={ imageUrl } alt="" />

                  </a>
                  <span className="graySmall">
                    <a
                      className="notButton"
                      href={ url }
                    >
                      {name}
                    </a>
                    <br />
                    <span>
                      (
                      {japName}
                      )
                    </span>
                  </span>
                </td>
                <td className="nicknamesBox">
                  {nicknames.map((nick, index) => {
                    console.log(nicknames.length);
                    if (index === nicknames.length - 1) {
                      return (
                        <span key={ index } className="nickname">
                          {nick}
                          .
                        </span>
                      );
                    }
                    return (
                      <span key={ index } className="nickname">
                        {nick}
                        {' '}
                        ,
                      </span>
                    );
                  })}
                </td>
                <td>{joinedFavorite}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      { !loading && (
        <button
          className="searchAnimNxtPrevButton"
          disabled={ currPage === 1 }
          onClick={ () => {
            if (currPage > 1) {
              const count = currPage - 1;
              setCurrPage(count);
            }
          } }
        >
          &#8249;
        </button>)}
      {!loading && <p className="currPage">{currPage}</p>}
      { !loading && (
        <button
          className="searchAnimNxtPrevButton"
          disabled={ !pagination.has_next_page }
          onClick={ () => {
            const count = currPage + 1;
            setCurrPage(count);
          } }
        >
          &#8250;
        </button>) }
      <Footer />
    </div>
  );
}
