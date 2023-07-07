import React, { useEffect, useState } from 'react';
import './SearchPageAllAnimes.css';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import PageLoader from '../../PageLoader';

const QUARENTA = 40;

export default function
SearchPageAllAnimes({ match: { params: { name } } }) {
  const [currPage, setCurrPage] = useState(1);
  const [arrayOfAnimes, setArrayOfAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { push } = useHistory();
  const { pathname } = useLocation();
  const usablePath = pathname.split('/')[1];
  const testingPath = () => usablePath === 'Anime Search';
  useEffect(() => {
    const fetchOfId = async (AnimeName) => {
      setLoading(true);
      let response;
      if (testingPath()) {
        response = await fetch(`https://api.jikan.moe/v4/anime?q=${AnimeName}&page=${currPage}`);
      } else {
        response = await fetch(`https://api.jikan.moe/v4/manga?q=${AnimeName}&page=${currPage}`);
      }
      const data = await response.json();
      setArrayOfAnimes(data);
      setLoading(false);
    };
    fetchOfId(name);
    // eslint-disable-next-line
  }, [name, currPage]);
  if (loading) return <PageLoader />;

  return (
    <div className="bigBox">
      <Header />
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>People</th>
            <th>
              Birthday
            </th>
            <th>Favorites</th>
          </tr>
        </thead>
      </table>
      <div className="containerAnime">
        {!loading && arrayOfAnimes.data.map((anime) => {
          console.log(anime.synopsis);
          let textJoin;
          if (anime.synopsis !== null) {
            const textSplit = anime.synopsis.split(' ');
            const textSlice = textSplit.slice(0, QUARENTA);
            textJoin = textSlice.join(' ');
            console.log(textSlice);
          }
          return (
            <div key={ anime.mal_id } className="mainBox">
              <div className="imgSynopsisBox">
                <img
                  src={ anime.images.jpg.small_image_url }
                  alt=""
                  className="imageSize"
                  width=" 50 "
                  height="70"
                />
                <div>

                  <span className="spanImg">{anime.title}</span>
                  <span className="synop">
                    { anime.synopsis !== null ? `${textJoin}` : 'Not Available' }
                    {' '}
                    <button
                      className="notAButton"
                      onClick={ () => {
                        if (testingPath()) {
                          push(`/animepage/${anime.title}`, { anime });
                        } else {
                          push(`/mangapage/${anime.title}`, { anime });
                        }
                      } }
                    >
                      Read More...

                    </button>
                  </span>
                </div>
              </div>
              <div className="labelBox">
                <span>Type</span>
                <p>{anime.type}</p>
              </div>
              <div className="labelBox">
                <span>{testingPath() ? 'Eps.' : 'Vol.' }</span>
                <p>{ testingPath() ? anime.episodes : anime.volumes || '-'}</p>

              </div>
              <div className="labelBox">
                <span>Score</span>
                <p>{anime.score}</p>

              </div>
              <div className="labelBox">
                <span>Members</span>
                <p>{anime.members}</p>

              </div>
            </div>
          );
        })}
      </div>
      <div className="ButtonAndPageNumberBox">
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
            disabled={ !arrayOfAnimes.pagination.has_next_page }
            onClick={ () => {
              const count = currPage + 1;
              setCurrPage(count);
            } }
          >
            &#8250;

          </button>) }
      </div>
      <Footer />
    </div>
  );
}
