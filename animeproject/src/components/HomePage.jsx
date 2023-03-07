import React, { useState, useEffect } from 'react';
import AnimeCard from './AnimeCard';
import Header from './Header';

export default function HomePage() {
  const [seasonAnimes, setSeasonAnimess] = useState([]);
  const [errors, setErrors] = useState(null);
  useEffect(() => {
    const fetchSeasonAnimes = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/seasons/now');
        if (!response.ok) {
          const newError = await response.json();
          throw newError.message;
        }
        const results = await response.json();
        console.log(results);
        console.log(results);
        setSeasonAnimess(results.data);
      } catch (e) {
        setErrors(e);
      }
    };
    fetchSeasonAnimes();
  }, []);
  return (
    <>
      <Header />
      <div className="animeBox">
        <AnimeCard
          seasonAnimes={ seasonAnimes }
          errors={ errors }
          animePropsStatus="Winter Season Animes"
        />

      </div>
    </>
  );
}
