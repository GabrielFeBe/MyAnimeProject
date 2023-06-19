import React from 'react';

export default function AsideAnimePage(props) {
  const { anime, streaming } = props;
  return (
    <>
      <h4 className="marginTextAlign">
        {anime.title}

      </h4>
      <img
        src={ anime.images.jpg.image_url }
        alt={ `Foto de ${anime.title}` }
        className="marginTextAlign"
      />
      <h5 className="marginTextAlign borderBottom">
        Alternative Titles
      </h5>
      <p className="marginTextAlign">
        {`Japanese: ${anime.title_japanese}`}

      </p>
      <p className="marginTextAlign">
        {`English: ${anime.title_english}`}

      </p>
      <h5 className="marginTextAlign borderBottom">Information</h5>
      <p className="marginTextAlign">
        {`Type: ${anime.type}`}

      </p>
      <p className="marginTextAlign">
        {`Episodes: ${anime.episodes}`}

      </p>
      <p className="marginTextAlign">
        {`Status: ${anime.status}`}

      </p>
      <p className="marginTextAlign">
        {`Aired: ${anime.aired.string}`}

      </p>
      <p className="marginTextAlign">
        {`Premiered: ${anime.season} ${anime.year}`}

      </p>
      <p className="marginTextAlign">
        {`Broadcast: ${anime.broadcast.string}`}

      </p>
      <p className="marginTextAlign">
        {`Producers: ${anime.producers.map((producer) => producer.name)}`}

      </p>
      <p className="marginTextAlign">
        {anime.licensors.length === 0
          ? 'Licensors: none found'
          : `Licensors: ${anime.licensors.map((licensor) => licensor.name)}`}
      </p>
      <p className="marginTextAlign">
        {`Studios: ${anime.studios.map((studio) => studio.name)}`}

      </p>
      <p className="marginTextAlign">
        {`Source: ${anime.source}`}

      </p>
      <p className="marginTextAlign">
        {`Genres: ${anime.genres.map((genre) => genre.name)}`}

      </p>
      <p className="marginTextAlign">
        {anime.themes.length === 1 ? `Theme: ${anime.themes[0].name}`
          : `Themes: ${anime.themes.map((theme) => theme.name)}`}
      </p>
      <p className="marginTextAlign">
        {`Duration: ${anime.duration}`}

      </p>
      <p className="marginTextAlign">
        {`Rating: ${anime.rating}`}

      </p>
      <h5 className="marginTextAlign borderBottom">Statistics</h5>
      <p
        className="marginTextAlign"
      >
        {`Score: ${anime.score} scored by ${anime.scored_by.toLocaleString()}`}

      </p>
      <p className="marginTextAlign">{`Ranked: #${anime.rank}`}</p>
      <p className="marginTextAlign">{`Popularity: #${anime.popularity}`}</p>
      <p className="marginTextAlign">
        {`Members: ${anime.members.toLocaleString()
        }`}

      </p>
      <p className="marginTextAlign">
        {`Favorites: ${anime.favorites.toLocaleString()
        }`}

      </p>
      <h5 className="marginTextAlign borderBottom">Streaming Platforms</h5>
      <div className="streamingFlexBox">
        {streaming && streaming.map((streamin) => (
          <a
            className="marginTextAlign"
            key={ streamin.name }
            href={ streamin.url }
          >
            {streamin.name}
          </a>))}
      </div>

    </>
  );
}
