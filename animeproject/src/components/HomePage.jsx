import React, { useState, useEffect } from 'react';
import AnimeCard from './AnimeCard';
import Header from './Header';
import Aside from './Aside';
import TopAnimeRows from './TopAnimeRows';
import PageLoader from '../PageLoader';
import Footer from './Footer';

export default function HomePage() {
  const [seasonAnimes, setSeasonAnimess] = useState([]);
  const [currentAnimeArray, setCurrentAnimeArray] = useState([]);
  const [errors, setErrors] = useState(null);
  const [arrayMovies, setArrayMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {

  }, []);
  useEffect(() => {
    const fetchSeasonAnimes = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/seasons/now');
        if (!response.ok) {
          const newError = await response.json();
          throw newError.message;
        }
        const results = await response.json();
        setSeasonAnimess(results.data);
      } catch (e) {
        setErrors(e);
      }
    };
    const fetchTopFiveAiringAnimes = async () => {
      const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=5&filter=airing');
      const data = await response.json();
      setCurrentAnimeArray(data.data);
    };

    const fetchTopFiveMovies = async () => {
      const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=5&type=movie');
      const data = await response.json();
      setArrayMovie(data.data);
      setLoading(false);
    };
    const timeForSecondFetch = setTimeout(() => {
      fetchTopFiveMovies();
      fetchTopFiveAiringAnimes();
    }, 3000);

    fetchSeasonAnimes();
    return () => {
      clearTimeout(timeForSecondFetch);
    };
  }, []);

  if (loading) {
    return (<PageLoader />);
  }
  return (
    <div className="wholeHomePage">
      <Header />

      <div className="asidePlusCard" style={ { margin: '0 auto' } }>
        <div className="boxToWhite">
          <AnimeCard
            seasonAnimes={ seasonAnimes }
            errors={ errors }
            animePropsStatus="Winter Season Animes"
          />
          <TopAnimeRows />
        </div>
        <aside>
          <Aside
            animeArray={ currentAnimeArray }
            title="Top Airing Anime"
            loading={ loading }

          />
          { arrayMovies.length > 0 && <Aside
            animeArray={ arrayMovies }
            title="Top Movies"
            loading={ loading }
          />}
        </aside>
      </div>
      <Footer />
    </div>
  );
}
