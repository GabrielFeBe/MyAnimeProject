import React, { useEffect, useState } from 'react';
import './TopManga.css';
import { useHistory } from 'react-router-dom';
import Header from '../Header';
import PageLoader from '../../PageLoader';
import Footer from '../Footer';

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

export default function TopManga() {
  const [currPage, setCurrPage] = useState(1);
  const [arrayOfMangas, setArrayOfMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { push } = useHistory();

  useEffect(() => {
    const fetchTopMangas = async () => {
      setLoading(true);
      const response = await fetch(`https://api.jikan.moe/v4/top/manga?page=${currPage}`);
      const data = await response.json();
      setArrayOfMangas(data);
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
          { !loading && arrayOfMangas.data.map((topManga) => {
            const { rank, title, type, mal_id: malId, score, status, images:
              { jpg: { image_url: imageUrl } }, volumes, publishing, members } = topManga;
            const { published: { prop: { to, from: { month, year } } } } = topManga;

            return (
              <tr key={ malId }>
                <td className="rankNumber">{rank}</td>
                <td className="titleContainer">
                  <button
                    className="notButton"
                    onClick={ () => {
                      const anime = topManga;
                      push(`/mangapage/${title}`, { anime });
                    } }
                  >
                    <img src={ imageUrl } alt="" />

                  </button>
                  <span className="graySmall">
                    <button
                      className="notButton"
                      onClick={ () => {
                        const anime = topManga;
                        push(`/mangapage/${title}`, { anime });
                      } }
                    >
                      {title}

                    </button>
                    <br />
                    {`${type} (${volumes === null ? '?' : volumes} vols)`}
                    <br />
                    {`${objOfMonths[month]} ${year} - ${publishing ? ''
                      : objOfMonths[to.month]} ${publishing ? '' : to.year}`}
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
      {' '}
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
            disabled={ !arrayOfMangas.pagination.has_next_page }
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
