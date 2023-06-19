import React, { useEffect, useState } from 'react';
import PageLoader from '../../PageLoader';
import Footer from '../Footer';
import Header from '../Header';

const objOfMonths = { 1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec' };

export default function TopAnimePage({ history: { push } }) {
  const [currPage, setCurrPage] = useState(1);
  const [arrayOfAnimes, setArrayOfAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopMangas = async () => {
      setLoading(true);
      const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${currPage}`);
      const data = await response.json();
      setArrayOfAnimes(data);
      setLoading(false);
    };
    fetchTopMangas();
  }, [currPage]);
  if (loading) return <PageLoader />;
  return (
    <div>
      <Header />

      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Title</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          { !loading && arrayOfAnimes.data.map((topAnime) => {
            const { rank, title, type, mal_id: malId, score, status, images:
              { jpg: { image_url: imageUrl } }, episodes, members, airing,
            } = topAnime;
            const { aired: { prop: { to, from: { month, year } } } } = topAnime;

            return (
              <tr key={ malId }>
                <td className="rankNumber">{rank}</td>
                <td className="titleContainer">
                  <button
                    className="notButton"
                    onClick={ () => {
                      const anime = topAnime;
                      push(`/animepage/${title}`, { anime });
                    } }
                  >
                    <img src={ imageUrl } alt="" />

                  </button>
                  <span className="graySmall">
                    <button
                      className="notButton"
                      onClick={ () => {
                        const anime = topAnime;
                        push(`/animepage/${title}`, { anime });
                      } }
                    >
                      {title}

                    </button>
                    <br />
                    {`${type} (${episodes === null ? '?' : episodes} eps)`}
                    <br />
                    {`${objOfMonths[month]} ${year} - ${airing ? ''
                      : objOfMonths[to.month]} ${to.year}`}
                    <br />
                    {`${members.toLocaleString()} members`}
                  </span>
                </td>
                <td>
                  <div className="tableDiv">
                    <span className="star">&#9733;</span>
                    <span>{score}</span>
                  </div>
                </td>
                <td><span>{status}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
