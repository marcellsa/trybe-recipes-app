import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  const [showInput, setShowInput] = useState(false);

  const history = useHistory();
  const { pathname } = history.location;
  console.log(pathname);

  const title = () => {
    switch (pathname) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return '';
    }
  };

  const search = () => {
    switch (pathname) {
    case '/profile':
      return false;
    case '/done-recipes':
      return false;
    case '/favorite-recipes':
      return false;
    default:
      return true;
    }
  };

  const inputSeartch = () => {
    if (showInput === true) {
      setShowInput(false);
    } else {
      setShowInput(true);
    }
  };

  return (
    <div>
      <h1 data-testid="page-title">{ title() }</h1>
      {
        search() === true
      && (
        <button type="button" onClick={ inputSeartch }>
          <img
            src={ searchIcon }
            alt="search"
            data-testid="search-top-btn"
          />
        </button>)
      }

      <button type="button" onClick={ () => history.push('/profile') }>
        <img
          src={ profileIcon }
          alt="profile"
          data-testid="profile-top-btn"
        />
      </button>

      {
        showInput && (
          <input type="text" data-testid="search-input" />
        )
      }

    </div>
  );
}
