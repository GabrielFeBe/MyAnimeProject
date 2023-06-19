import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Header from './Header';
import '../App.css';
import PageLoader from '../PageLoader';
import Footer from './Footer';
import AsideAnimePage from './AsideAnimePage';

export default function AnimePage({ location: { state: { anime } } }) {
  const [staff, setStaff] = useState([]);
  const [streaming, setStreaming] = useState([]);
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    };
    staffFetch();
    stremingFetch();
    const delayingFetchs = setTimeout(() => {
      producersFetch();
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
          <AsideAnimePage anime={ anime } streaming={ streaming } />
        </aside>
        <main>
          <div className="titleofcontentbox marginBottom">
            <h4>Synopsis</h4>
            <h4>Trailer</h4>

          </div>
          <div className="contentBox marginBottom">
            { !anime.trailer.embed_url ? 'Not an available trailer' : <ReactPlayer
              url={ anime.trailer.embed_url }
              width="40%"
              height="100%"
            />}
            <p className="synopsis">{anime.synopsis}</p>

          </div>
          <div>
            <h4 className="marginBottom">Background</h4>
            <p className="marginBottom">
              {anime.background
              || 'No background information has been added to this title. '}
            </p>
          </div>
          <h4 className="marginBottom">Characters & Voice Actors</h4>
          <div className="actorBigContainer marginBottom">
            {staff && staff
              .filter((validArray) => validArray
                .voice_actors.some(({ language }) => language === 'Japanese')) // test to see if there's a japanese option in voice actors
              .slice(0, 10)
              .map((voiceActor) => {
                const japaneseActor = voiceActor.voice_actors
                  .find(({ language }) => language === 'Japanese');
                return (
                  <div
                    key={ voiceActor.character.mal_id }
                    className="actorSmallContainer"
                  >
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
                        src={ japaneseActor.person.images.jpg.image_url }
                        className="img_voice"
                        alt=""
                      />
                      <p>
                        {japaneseActor.person.name}
                        <br />
                        <br />
                        {japaneseActor.language}
                      </p>

                    </div>
                  </div>
                );
              })}

          </div>
          <h4 className="marginBottom">Staff</h4>
          <div className="actorBigContainer marginBottom">
            {producers && producers.filter(
              ({ positions }) => positions.includes('Producer')
              || positions.includes('Director') || positions.includes('Script'),
            ).slice(0, 4)
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
                </div>

              ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>

  );
}
