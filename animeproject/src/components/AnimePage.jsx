import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import Header from './Header';
import '../App.css';

export default function AnimePage({ location: { state: { anime } } }) {
  const [staff, setStaff] = useState([]);
  const [streaming, setStreaming] = useState([]);
  const [producers, setProducers] = useState([]);
  const [review, setReview] = useState([]);
  useEffect(() => {
    const staffFetch = async () => {
      const reponse = await fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/characters`);
      const data = await reponse.json();
      setStaff(data.data);
    };
    const stremingFetch = async () => {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/streaming`);
      const data = await response.json();
      setStreaming(data.data);
    };
    const producersFetch = async () => {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/staff`);
      const data = await response.json();
      setProducers(data.data);
    };
    const reviewsFetch = async () => {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/reviews`);
      const data = await response.json();
      setReview(data.data);
    };
    staffFetch();
    stremingFetch();
    producersFetch();
    reviewsFetch();
  }, [anime.mal_id]);
  return (

    <div>
      <Header />
      <div className="container">
        <aside>
          <h4>{anime.title}</h4>
          <img src={ anime.images.jpg.image_url } alt={ `Foto de ${anime.title}` } />
          <h5>Alternative Titles</h5>
          <p>{`Japanese: ${anime.title_japanese}`}</p>
          <p>{`English: ${anime.title_english}`}</p>
          <h5>Information</h5>
          <p>{`Type: ${anime.type}`}</p>
          <p>{`Episodes: ${anime.episodes}`}</p>
          <p>{`Status: ${anime.status}`}</p>
          <p>{`Aired: ${anime.aired.string}`}</p>
          <p>{`Premiered: ${anime.season} ${anime.year}`}</p>
          <p>{`Broadcast: ${anime.broadcast.string}`}</p>
          <p>{`Producers: ${anime.producers.map((producer) => producer.name)}`}</p>
          <p>
            {anime.licensors.length === 0
              ? 'Licensors: none found'
              : `Licensors: ${anime.licensors.map((licensor) => licensor.name)}`}
          </p>
          <p>{`Studios: ${anime.studios.map((studio) => studio.name)}`}</p>
          <p>{`Source: ${anime.source}`}</p>
          <p>{`Genres: ${anime.genres.map((genre) => genre.name)}`}</p>
          <p>
            {anime.themes.length === 1 ? `Theme: ${anime.themes[0].name}`
              : `Themes: ${anime.themes.map((theme) => theme.name)}`}
          </p>
          <p>{`Duration: ${anime.duration}`}</p>
          <p>{`Rating: ${anime.rating}`}</p>
          <h5>Statistics</h5>
          <p>{`Score: ${anime.score} scored by ${anime.scored_by}`}</p>
          <p>{`Ranked: #${anime.rank}`}</p>
          <p>{`Popularity: #${anime.popularity}`}</p>
          <p>{`Members: ${anime.members}`}</p>
          <p>{`Favorites: ${anime.favorites}`}</p>
          <h5>Streaming Platforms</h5>
          {streaming && streaming.map((streamin) => (
            <a
              key={ streamin.name }
              href={ streamin.url }
            >
              {streamin.name}
            </a>))}
        </aside>
        <main>
          <div className="titleofcontentbox">
            <h4>Synopsis</h4>

            <h4>Trailer</h4>

          </div>
          <div className="contentBox">
            <ReactPlayer
              url={ anime.trailer.embed_url }
              width="40%"
              height="100%"
            />
            <p className="synopsis">{anime.synopsis}</p>

          </div>
          <div>
            <h4>Background</h4>
            <p>{anime.background}</p>
          </div>
          <h4>Characters & Voice Actors</h4>
          <div className="actorBigContainer">
            {staff && staff.filter((validArray) => validArray.voice_actors[0])
              .map((voiceActor) => (
                <div key={ voiceActor.character.mal_id } className="actorSmallContainer">
                  <div className="charImage start">
                    <img
                      src={ voiceActor.character.images.jpg.image_url }
                      alt=""
                      className="img_voice"
                    />
                    <p>
                      {voiceActor.character.name}
                      <br />
                      <br />
                      {voiceActor.role}
                    </p>
                  </div>
                  <div className="charImage end">
                    <img
                      src={ voiceActor.voice_actors[0].person.images.jpg.image_url }
                      className="img_voice"
                      alt=""
                    />
                    <p>
                      {voiceActor.voice_actors[0].person.name}
                      <br />
                      <br />
                      {voiceActor.voice_actors[0].language}
                    </p>

                  </div>
                </div>
              ))}

          </div>
          <h4>Staff</h4>
          <div className="actorBigContainer">
            {producers && producers.filter(
              (staffArr) => staffArr.positions.includes('Producer'),
            )
              .map((filteredStaff) => (
                <div
                  key={ filteredStaff.person.mal_id }
                  className="actorSmallContainer"
                >
                  <div className="charImage start">
                    <img
                      src={ filteredStaff.person.images.jpg.image_url }
                      className="img_voice"
                      alt="staff"
                    />
                    <p>
                      {filteredStaff.person.name}
                      <br />
                      <br />
                      {filteredStaff.positions[0]}
                    </p>

                  </div>
                </div>))}

          </div>
        </main>
      </div>
    </div>

  );
}

AnimePage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      anime: PropTypes.arrayOf({}),
    }),
  }).isRequired,
};
