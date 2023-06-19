import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PageLoader from '../../PageLoader';
import Footer from '../Footer';
import Header from '../Header';
import './SeasonalAnime.css';

const twentyFive = 24;
export default function SeasonalAnime() {
  const [seasonAnimes, setSeasonAnimess] = useState([]);
  const [arrowUp, setArrowUp] = useState(new Array(twentyFive).fill(false));
  const [pagination, setPagination] = useState({});
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { push } = useHistory();

  useEffect(() => {
    const fetchSeasonAnimes = async () => {
      setLoading(true);
      const response = await fetch(`https://api.jikan.moe/v4/seasons/now?page=${currPage}&limit=24`);
      const results = await response.json();
      setPagination(results.pagination);
      setSeasonAnimess(results.data);
      setLoading(false);
    };
    fetchSeasonAnimes();
  }, [currPage]);
  console.log(loading);
  if (loading) return <PageLoader />;

  return (
    <div className="containerOfAll">
      <Header />
      <div className="cardBox">
        {seasonAnimes.map((anime, i) => {
          const { images: { jpg: { image_url: image } }, title, aired: { string },
            episodes, duration, genres, synopsis, studios, source, themes,
            demographics, score, members } = anime;
          let newNumb;
          const theNumbers = members.toString().split('');
          if (theNumbers.length <= 3) {
            newNumb = theNumbers;
          }
          if (theNumbers.length > 3) {
            const sliceAndJoin = theNumbers.slice(0, -3).join('');
            newNumb = `${sliceAndJoin}K`;
          }
          const splitingDate = string.split('to');
          return (
            <div key={ i } className="seasonAnimeBox">
              <button
                className="animeTitle notButton"
                onClick={ () => {
                  push(`/animepage/${title}`, { anime });
                } }
              >
                {title}
              </button>
              <p>
                {`${splitingDate[0]} | ${episodes !== null
                  ? episodes : '?'} eps, ${duration === 'Unknown' ? 0 : duration} min`}
              </p>
              <div className="genreBox">
                {genres.map((genre, index) => (
                  <a
                    key={ index }
                    href={ genre.url }
                    className="genreSeasonal"
                  >
                    {genre.name}

                  </a>
                ))}

              </div>
              <div className="imgAndContentBox">
                <img src={ image } alt="anime from season" />
                <div className="contentiBox">
                  <p
                    className={ arrowUp[i]
                      ? 'showAll' : 'synopsisSeason' }
                  >
                    {synopsis}

                  </p>
                  <br />
                  {arrowUp[i]
                    ? (
                      <button
                        className="noButton"
                        onClick={ () => {
                          const newArray = arrowUp;
                          newArray[i] = !arrowUp[i];
                          setArrowUp([...newArray]);
                        } }
                      >
                        &#x25B2;

                      </button>)

                    : (
                      <button
                        className="noButton"
                        onClick={ () => {
                          const newArray = arrowUp;
                          newArray[i] = !arrowUp[i];
                          setArrowUp([...newArray]);
                        } }
                      >
                        &#x25BC;

                      </button>)}
                  <br />
                  <span>
                    Studio:
                    {' '}
                    {studios.map((studio, index) => {
                      if (studios.length - 1 !== index) {
                        return (
                          <>
                            <a
                              key={ studio.mal_id }
                              href={ studio.url }
                            >
                              {studio.name}

                            </a>
                            ,
                            {' '}
                          </>
                        );
                      }
                      return (
                        <a
                          key={ studio.mal_id }
                          href={ studio.url }
                        >
                          {studio.name}

                        </a>
                      );
                    })}
                  </span>
                  <br />
                  <span>{`Source: ${source}`}</span>
                  <br />
                  { themes.length === 1
                    ? (
                      <span>
                        Theme:
                        {' '}
                        <a href={ themes[0].url }>
                          { themes[0].name}
                        </a>
                      </span>
                    )
                    : (
                      <span>
                        Themes:
                        {themes.map((theme, index) => {
                          const { name, url } = theme;
                          if (themes.length - 1 !== index) {
                            return (
                              <>
                                <a
                                  key={ index }
                                  href={ url }
                                >
                                  {name}

                                </a>
                                ,
                                {' '}
                              </>
                            );
                          }
                          return (
                            <a
                              key={ index }
                              href={ url }
                            >
                              {name}
                            </a>
                          );
                        })}
                      </span>)}
                  <br />
                  {demographics.length > 0
              && (
                <span>
                  Demographics:
                  <a href={ demographics[0].url }>{demographics[0].name}</a>
                </span>)}
                </div>
              </div>
              <div className="rateAndMembers">
                <span>
                  &#9734;
                  {score}
                </span>
                <span>
                  &#x1F464;
                  {newNumb}
                </span>

              </div>
            </div>
          );
        })}
      </div>
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
