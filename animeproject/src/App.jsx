// import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AnimePage from './components/AnimePage';
import SearchPage from './components/AnimePages/SearchPage';
import SearchPageAllAnimes from './components/AnimePages/SearchPageAllAnimes';
import MangaSearch from './components/MangaPages/MangaSearch';
import MangaPage from './components/MangaPages/MangaPage';
import TopManga from './components/MangaPages/TopManga';
import TopAnimePage from './components/AnimePages/TopAnimePage';
import SeasonalAnime from './components/AnimePages/SeasonalAnime';
import Recommendation from './components/AnimePages/Recommendation';
import Character from './components/AnimePages/Character';
import People from './components/AnimePages/People';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/People" component={ People } />
        <Route exact path="/Character" component={ Character } />
        <Route exact path="/Recommendation" component={ Recommendation } />
        <Route exact path="/" component={ HomePage } />
        <Route path="/animepage/:id" component={ AnimePage } />
        <Route path="/Manga Search" component={ MangaSearch } />
        <Route exact path="/Anime Search" component={ SearchPage } />
        <Route path="/Anime Search/:name" component={ SearchPageAllAnimes } />
        <Route path="/mangapage/:name" component={ MangaPage } />
        <Route path="/Top Manga" component={ TopManga } />
        <Route path="/Top Anime" component={ TopAnimePage } />
        <Route path="/Seasonal Anime" component={ SeasonalAnime } />
      </Switch>

    </div>
  );
}

export default App;
