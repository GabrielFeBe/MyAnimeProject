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
export default function People() {
  const [loading, setLoading] = useState(true);
  const [peopleArray, setPeopleArray] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currPage, setCurrPage] = useState(1);
  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      const response = await fetch(`https://api.jikan.moe/v4/top/people?page=${currPage}`);
      const data = await response.json();
      setPeopleArray(data.data);
      setPagination(data.pagination);
      setLoading(false);
    };
    fetchPeople();
  }, [currPage]);
  if (loading) return <PageLoader />;
  return (
    <div>
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
        <tbody>
          { !loading && peopleArray.map((topPeople, i) => {
            const { mal_id: malId, favorites, name, birthday,
              given_name: givenName, family_name: familyName, url, images:
              { jpg: { image_url: imageUrl } },
            } = topPeople;
            const favoritesLastThree = favorites.toString().slice(-3);
            const withoutLastThree = favorites.toString()
              .split('').slice(0, -3).join('');
            const joinedFavorite = [withoutLastThree, favoritesLastThree].join('.');
            let month;
            let day;
            let year;
            console.log(birthday);
            if (birthday !== null) {
              const birthDate = birthday.split('T')[0];
              const [yearInfo, monthInfo, dayInfo] = birthDate.split('-');
              month = monthInfo;
              day = dayInfo;
              year = yearInfo;
            }
            // console.log(objOfMonths[+month]);
            return (
              <tr key={ malId }>
                <td className="rankNumber">{(i + 1) + (+currPage - 1) * 25 }</td>
                <td className="titleContainer">
                  <a
                    className="notButton"
                    href={ url }
                  >
                    <img src={ imageUrl } alt="g" />

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
                      {`${familyName !== null ? familyName : ''} 
                      ${givenName !== null ? givenName : ''}`}
                      )
                    </span>
                  </span>
                </td>
                <td>
                  {birthday !== null ? `${objOfMonths[+month]} ${day}, ${year}`
                    : 'unknown'}
                </td>
                <td>{ joinedFavorite}</td>
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
