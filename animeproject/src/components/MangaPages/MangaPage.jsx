import React, { useEffect, useState } from 'react';
import Header from '../Header';
import './MangaPage.css';
import PageLoader from '../../PageLoader';
import Footer from '../Footer';

const DEZ = 10;

export default function MangaPage({ location: { state: { anime } } }) {
  const [charsArr, setCharsArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const arrOfCharsSliced = charsArr.slice(0, DEZ);
  useEffect(() => {
    const fetchAnimeCharacters = async () => {
      const response = await fetch(`https://api.jikan.moe/v4/manga/${anime.mal_id}/characters`);
      const data = await response.json();
      setCharsArr(data.data);
      setLoading(false);
    };
    // const fetchMangaReviews = async () => {
    //   const response = await fetch(`https://api.jikan.moe/v4/manga/${anime.mal_id}/reviews`);
    //   const data = await response.json();
    //   console.log(data);
    // };
    const delayingFetchs = setTimeout(() => {
      fetchAnimeCharacters();
      // fetchMangaReviews();
    }, 3000);
    return () => {
      clearTimeout(delayingFetchs);
    };
  }, [anime.mal_id]);
  if (loading) return <PageLoader />;

  return (
    <div>
      <Header />
      <div className="container">
        <aside>
          <h4 className="marginTextAlign">{anime.title}</h4>
          <img src={ anime.images.jpg.image_url } alt={ `Foto de ${anime.title}` } />
          <h5 className="marginTextAlign borderBottom">Alternative Titles</h5>
          <p className="marginTextAlign">
            { anime.title_japanese !== null && `Japanese: ${anime.title_japanese}`}

          </p>
          <p className="marginTextAlign">
            {anime.title_english !== null && `English: ${anime.title_english}`}

          </p>
          <h5 className="marginTextAlign borderBottom">Information</h5>
          <p className="marginTextAlign">{`Type: ${anime.type}`}</p>
          <p className="marginTextAlign">{`Chapters: ${anime.chapters}`}</p>
          <p className="marginTextAlign">{`Status: ${anime.status}`}</p>
          <p className="marginTextAlign">{`Published: ${anime.published.string}`}</p>
          <p className="marginTextAlign">
            {`Authors: ${anime.authors.map((author) => `${author.name}(Art/Story)`)}`}
          </p>
          <p className="marginTextAlign">{`Source: ${anime.source}`}</p>
          <p
            className="marginTextAlign"
          >
            {`Genres: ${anime.genres.map((genre) => genre.name)}`}

          </p>
          <p className="marginTextAlign">
            {anime.themes.length === 1 ? `Theme: ${anime.themes[0].name}`
              : `Themes: ${anime.themes.map((theme) => theme.name)}`}
          </p>
          <p className="marginTextAlign">{`Volumes: ${anime.volumes}`}</p>
          <p className="marginTextAlign">{`Rating: ${anime.rating}`}</p>
          <h5 className="marginTextAlign borderBottom">Statistics</h5>
          <p className="marginTextAlign">
            {`Score: ${anime.score} scored by ${anime.scored_by.toLocaleString()}`}

          </p>
          <p className="marginTextAlign">{`Ranked: #${anime.rank}`}</p>
          <p className="marginTextAlign">{`Popularity: #${anime.popularity}`}</p>
          <p className="marginTextAlign">
            {`Members: ${anime.members.toLocaleString()}`}

          </p>
          <p className="marginTextAlign">
            {`Favorites: ${anime.favorites.toLocaleString()
            }`}

          </p>
        </aside>
        <main>
          <h4 className="resumeH">Synopsis</h4>
          <hr />
          <p className="resume">{anime.synopsis}</p>
          <h4 className="resumeH">Background</h4>
          <hr />
          <p className="resume">{anime.background}</p>
          <hr />
          <h4 className="resume">Characters</h4>
          <hr />
          <div className="actorBigContainer">
            {arrOfCharsSliced.map((char) => (
              <div className="actorSmallContainer" key={ char.character.mal_id }>
                <div className="charImage start">
                  <img
                    src={ char.character.images.jpg.image_url }
                    alt=""
                    className="img_char"
                  />
                  <p>
                    {char.character.name}
                    <br />
                    <br />
                    {char.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
