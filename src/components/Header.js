import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ children }) {
  const [showInput, setShowInput] = useState(false);

  const history = useHistory();

  const inputSeartch = () => {
    if (showInput === true) {
      setShowInput(false);
    } else {
      setShowInput(true);
    }
  };

  return (
    <div>
      <h1 data-testid="page-title">{ children }</h1>
      <button type="button" onClick={ () => history.push('/profile') }>
        <img
          src={ profileIcon }
          alt="profile"
          data-testid="profile-top-btn"
        />
      </button>
      {
        (children === 'Meals' || children === 'Drinks')
      && (
        <button type="button" onClick={ inputSeartch }>
          <img
            src={ searchIcon }
            alt="search"
            data-testid="search-top-btn"
          />
        </button>)
      }

      {
        showInput && (
          <input type="text" data-testid="search-input" />
        )
      }

    </div>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
