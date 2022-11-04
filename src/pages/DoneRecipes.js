import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const MOCK_TEST = [
  {
    idMeal: '52977',
    strArea: 'Turkish',
    strCategory: 'Side',
    strMeal: 'Corba',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    strTags: 'Soup',
  },
  {
    idMeal: '53026',
    strArea: 'Egyptian',
    strCategory: 'Vegetarian',
    strMeal: 'Tamiya',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg',
    strTags: null,
  },
  {
    idDrink: '15997',
    strCategory: 'Ordinary Drink',
    strDrink: 'GG',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    strTags: null,
  },
];

export default function DoneRecipes() {
  const [filterButton, setFilterButton] = useState('All');
  const [results, setResults] = usaState([]);

  const getDoneRecipes = () => {
    localStorage.setItem('doneRecipes', JSON.stringify(MOCK_TEST));
    const doneRecipesKey = localStorage.getItem('doneRecipes');
    return JSON.parse(doneRecipesKey);
  };

  const handleFilterButtonChange = useCallback(() => {
    const localStorageData = getDoneRecipes();
    if (filterButton === 'Meals') {
      const newResult = localStorage.filter((recipe) => recipe.includes(recipe.idMeal));
      setResults(newResult);
    } else if (filterButton === 'Drinks') {
      const newResult = localStorage.filter((recipe) => recipe.includes(recipe.idDrink));
      setResults(newResult);
    } else {
      setResults(localStorageData);
    }
  }, [filterButton, setResults]);

  useEffect(() => {
    getDoneRecipes();
  }, []);

  useEffect(() => {
    handleFilterButtonChange();
  }, [handleFilterButtonChange]);

  return (
    <div>
      <Header>
        DoneRecipes
      </Header>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setFilterButton('All') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        type="button"
        onClick={ () => setFilterButton('Meals') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setFilterButton('Drinks') }
      >
        Drinks
      </button>

      {results?.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link
            to={
              recipe.includes(recipe.idMeal)
                ? `/meals/${recipe.idMeal}`
                : `/drinks/${recipe.idDrink}`
            }
          >
            <img
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
              alt="recipe"
              width="250px"
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}`
              : `${recipe.alcoholicOrNot}`}
          </p>
          <Link
            to={
              recipe.type === 'meal'
                ? `/meals/${recipe.id}`
                : `/drinks/${recipe.id}`
            }
          >
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>

          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

          <button
            type="button"
            onClick={ () => getURL(recipe) }
            className="btnURL"
          >
            <img
              src={ shareIcon }
              alt="share"
              data-testid={ `${index}-horizontal-share-btn` }
              className="doneRecipesShare"
            />
          </button>
          <ul>
            {recipe?.tags.map((tagName) => (
              <li
                data-testid={ `${index}-${tagName}-horizontal-tag` }
                key={ tagName }
              >
                {tagName}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
