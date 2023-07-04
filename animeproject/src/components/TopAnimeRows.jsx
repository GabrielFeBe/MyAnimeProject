import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './TopAnimeRows.css';

export default function TopAnimeRows() {
  const [arrayOfTopTen, setArrayOfTopTen] = useState([]);
  useEffect(() => {
    const fetchTopTenAnimes = async () => {
      const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=10');
      const data = await response.json();
      setArrayOfTopTen(data.data);
    };
    fetchTopTenAnimes();
  }, []);

  const { push } = useHistory();
  return (
    <>
      <h2>Most Popular Anime</h2>
      <div className="topTenBox">
        {arrayOfTopTen.map((anime, i) => {
          const { score, members, type, images: { jpg: { image_url: imageUrl } },
            title, mal_id: malId } = anime;
          const state = { anime };
          return (
            <div className="containerOfTopTenAnime" key={ malId }>
              <div className="holder">
                <button
                  className="notButton topButtonConfig"
                  onClick={ () => push(`/animepage/${anime.title}`, state) }
                >

                  <img src={ imageUrl } alt="" className="imageTen" />
                </button>
                <div>
                  <Link
                    className="topAnimeLink"
                    to={ { pathname: `/animepage/${anime.title}`, state: { anime } } }
                  >
                    {`${i + 1}. ${title}`}

                  </Link>
                  <br />
                  <span className="topSpan">
                    Type:
                    {' '}
                    {type}
                  </span>
                  <br />
                  <span
                    className="topSpan"
                  >
                    {`Members: ${members.toLocaleString()}`}

                  </span>
                  <br />
                  <span className="topSpan">{`Score: ${score}`}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
