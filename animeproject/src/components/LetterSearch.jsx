import React, { useState } from 'react';

const searchArr = ['Upcoming', '#', 'A', 'B', 'C',
  'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export default function LetterSearch() {
  const [isSelected, setIsSelected] = useState('');
  const [isOver, setIsOver] = useState('');
  const [arraySearch, setArraySearch] = useState([]);

  function isSelectedTrue(param) {
    return param === isSelected;
  }

  function isOverTrue(param) {
    return param === isOver;
  }

  async function fetchingArraySearch(value) {
    const response = await fetch(`https://api.jikan.moe/v4/manga?letter=${value}&order_by=title&sort=asc`);
    const data = await response.json();
    setArraySearch(data);
  }
  async function fetchingUpcoming() {
    const response = await fetch('https://api.jikan.moe/v4/manga?&order_by=title&sort=asc&status=upcoming');
    const data = await response.json();
    setArraySearch(data);
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
