import React, { useEffect, useState } from 'react';
import Header from '../Header';
import './MangaPage.css';

export default function MangaPage({ location: { state: { anime } } }) {
  const [charsArr, setCharsArr] = useState([]);
  useEffect(() => {
    const fetchAnimeCharacters = async () => {
      const response = await fetch(`https://api.jikan.moe/v4/manga/${anime.mal_id}/characters`);
      const data = await response.json();
      setCharsArr(data);
    };
    fetchAnimeCharacters();
  }, [anime.mal_id]);
  return (
    <div>
      <Header />
      <div className="container">
        <aside>
          <h4>{anime.title}</h4>
          <img src={ anime.images.jpg.image_url } alt={ `Foto de ${anime.title}` } />
          <h5>Alternative Titles</h5>
          <p>{ anime.title_japanese !== null && `Japanese: ${anime.title_japanese}`}</p>
          <p>{anime.title_english !== null && `English: ${anime.title_english}`}</p>
          <h5>Information</h5>
          <p>{`Type: ${anime.type}`}</p>
          <p>{`Chapters: ${anime.chapters}`}</p>
          <p>{`Status: ${anime.status}`}</p>
          <p>{`Published: ${anime.published.string}`}</p>
          <p>{`Authors: ${anime.authors.map((author) => `${author.name}(Art/Story)`)}`}</p>
          {}
          <p>{`Source: ${anime.source}`}</p>
          <p>{`Genres: ${anime.genres.map((genre) => genre.name)}`}</p>
          <p>
            {anime.themes.length === 1 ? `Theme: ${anime.themes[0].name}`
              : `Themes: ${anime.themes.map((theme) => theme.name)}`}
          </p>
          <p>{`Volumes: ${anime.volumes}`}</p>
          <p>{`Rating: ${anime.rating}`}</p>
          <h5>Statistics</h5>
          <p>{`Score: ${anime.score} scored by ${anime.scored_by}`}</p>
          <p>{`Ranked: #${anime.rank}`}</p>
          <p>{`Popularity: #${anime.popularity}`}</p>
          <p>{`Members: ${anime.members}`}</p>
          <p>{`Favorites: ${anime.favorites}`}</p>
        </aside>
        <main>
          <h4 className="resumeH">Synopsis</h4>
          <hr />
          <p className="resume">{anime.synopsis}</p>
          <h4 className="resumeH">Background</h4>
          <hr />
          <p className="resume">{anime.background}</p>
        </main>
      </div>
    </div>
  );
}
