import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const searchArr = ['Upcoming', '#', 'A', 'B', 'C',
  'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export default function LetterSearch({ setArraySearchAnime, setArraySearchManga }) {
  const [isSelected, setIsSelected] = useState('');
  const [isOver, setIsOver] = useState('');

  const { pathname } = useLocation();
  function isSelectedTrue(param) {
    return param === isSelected;
  }
  function isOverTrue(param) {
    return param === isOver;
  }
  function isAnime() {
    return pathname === '/Anime Search';
  }
  function isManga() {
    return pathname === '/Manga Search';
  }
  async function fetchingArraySearch(value) {
    if (isAnime()) {
      const response = await fetch(`https://api.jikan.moe/v4/anime?letter=${value}&order_by=title&sort=asc&sfw=true`);
      const data = await response.json();
      setArraySearchAnime(data);
    }
    if (isManga()) {
      const response = await fetch(`https://api.jikan.moe/v4/manga?letter=${value}&order_by=title&sort=asc&sfw=true`);
      const data = await response.json();
      setArraySearchManga(data);
    }
  }
  async function fetchingUpcoming() {
    if (isAnime()) {
      const response = await fetch('https://api.jikan.moe/v4/anime?status=upcoming');
      const data = await response.json();
      setArraySearchAnime(data);
    }
    if (isManga()) {
      const response = await fetch('https://api.jikan.moe/v4/manga?status=upcoming');
      const data = await response.json();
      setArraySearchManga(data);
    }
  }
  return (
    <div>
      {searchArr.map((letter) => (
        <button
          style={ { margin: '10px' } }
          value={ letter }
          className={ isSelectedTrue(letter) || isOverTrue(letter)
            ? 'selectedButton' : 'notButton' }
          key={ letter }
          onClick={ async ({ target: { value } }) => {
            setIsSelected(letter);
            if (letter.length === 1)fetchingArraySearch(value);
            if (letter === 'Upcoming') fetchingUpcoming();
          } }
          onMouseEnter={ () => setIsOver(letter) }
          onMouseLeave={ () => setIsOver('') }
        >
          {letter}
        </button>))}

    </div>
  );
}
