import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import fetchAPI from '../services/FetchAPI';

export default function SearchBar() {
  const [radioValue, setRadioValue] = useState('');
  const [responseSerch, setResponseSearch] = useState('');
  console.log('resposta da Api', responseSerch);

  const { inputSearch } = useContext(Context);

  const ApiSearchBar = async () => {
    if (radioValue === 'ingredient') {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
      const response = await fetchAPI(url);
      return setResponseSearch(response);
    }

    if (radioValue === 'name') {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`;
      const response = await fetchAPI(url);
      return setResponseSearch(response);
    }

    if (radioValue === 'first-letter' && inputSearch.length === 1) {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`;
      const response = await fetchAPI(url);
      return setResponseSearch(response);
    }
    global.alert('Your search must have only 1 (one) character');
  };

  const handleChange = ({ target }) => {
    setRadioValue(target.value);
  };

  const handelClick = () => {
    ApiSearchBar();
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
