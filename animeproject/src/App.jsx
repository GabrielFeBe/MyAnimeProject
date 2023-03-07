// import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AnimePage from './components/AnimePage';
import SearchPage from './components/AnimePages/SearchPage';
import SearchPageAllAnimes from './components/AnimePages/SearchPageAllAnimes';
import MangaSearch from './components/AnimePages/MangaSearch';
import MangaPage from './components/AnimePages/MangaPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route path="/animepage/:id" component={ AnimePage } />
        <Route path="/Manga Search" component={ MangaSearch } />
        <Route exact path="/Anime Search" component={ SearchPage } />
        <Route path="/Anime Search/:name" component={ SearchPageAllAnimes } />
        <Route path="/mangapage/:name" component={ MangaPage } />
      </Switch>

    </div>
  );
}

export default App;
