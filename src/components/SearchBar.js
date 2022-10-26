import React, { useState } from 'react';

export default function SearchBar() {
  const [radioValue, setRadioValue] = useState('');
  const ApiSearchBar = () => {

  };

  const handleChange = ({ target }) => {
    setRadioValue(target.value);
    console.log(radioValue);
  };
  const handelClick = () => {
    ApiSearchBar(radioValue);
  };

  return (
    <div>
      <p>
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="search"
          value="ingredient"
          onChange={ handleChange }
        />
        Ingredient
        <input
          data-testid="name-search-radio"
          type="radio"
          name="search"
          value="name"
          onChange={ handleChange }
        />
        Name
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="search"
          value="first-letter"
          onChange={ handleChange }
        />
        Fist letter
      </p>
      <p>
        <input
          data-testid="exec-search-btn"
          type="button"
          id="btnSearch"
          value="SEARCH"
          onClick={ handelClick }
        />
      </p>
    </div>
  );
}
