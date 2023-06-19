import React, { useEffect, useState } from 'react';
import './SearchPageAllAnimes.css';
import Header from '../Header';
import Footer from '../Footer';
import PageLoader from '../../PageLoader';

const VINTENOVE = 29;

export default function
SearchPageAllAnimes({ match: { params: { name } }, history }) {
  const [currPage, setCurrPage] = useState(1);
  const [arrayOfAnimes, setArrayOfAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOfId = async (AnimeName) => {
      setLoading(true);
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${AnimeName}&page=${currPage}
      `);
      const data = await response.json();
      setArrayOfAnimes(data);
      setLoading(false);
    };
    fetchOfId(name);
  }, [name, currPage]);
  if (loading) return <PageLoader />;

  return (
    <div className="bigBox">
      <Header />
      <div className="containerAnime">
        {!loading && arrayOfAnimes.data.map((anime) => {
          console.log(anime.synopsis);
          let textJoin;
          if (anime.synopsis !== null) {
            const textSplit = anime.synopsis.split(' ');
            const textSlice = textSplit.slice(0, VINTENOVE);
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
                        history.push(`/animepage/${anime.title}`, { anime });
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
                <span>Eps.</span>
                <p>{anime.episodes}</p>

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
