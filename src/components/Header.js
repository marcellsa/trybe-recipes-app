import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import Context from '../context/Context';

export default function Header({ children }) {
  const [showInput, setShowInput] = useState(false);
  const { inputSearch, setInputSearch } = useContext(Context);

  const showInputSearch = () => {
    if (showInput === true) {
      setShowInput(false);
    } else {
      setShowInput(true);
    }
  };

  const handleChange = ({ target }) => {
    setInputSearch(target.value);
  };

  return (
    <div>
      <h1 data-testid="page-title">{ children }</h1>
      <Link to="/profile">
        <button type="button" src={ profileIcon }>
          <img
            src={ profileIcon }
            alt="profile"
            data-testid="profile-top-btn"
          />
        </button>
      </Link>
      {
        (children === 'Meals' || children === 'Drinks')
      && (
        <button type="button" onClick={ showInputSearch }>
          <img
            src={ searchIcon }
            alt="search"
            data-testid="search-top-btn"
          />
        </button>)
      }

      {
        showInput && (
          <div>
            <input
              type="text"
              data-testid="search-input"
              onChange={ handleChange }
              value={ inputSearch }
            />
            <SearchBar />
          </div>
        )
      }

    </div>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
