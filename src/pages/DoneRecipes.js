import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const MOCK_TEST = {
  idMeal: '52977',
  strArea: 'Turkish',
  strCategory: 'Side',
  strMeal: 'Corba',
  strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  strTags: 'Soup',
};

export default function DoneRecipes() {
  const [filter, setFilter] = useState('All');
  const [result, setResult] = usaState([]);

  const getDoneRecipes = () => {
    localStorage.setItem('doneRecipes', JSON.stringify(MOCK_TEST));
    const doneRecipesKey = localStorage.getItem('doneRecipes');
    return JSON.parse(doneRecipesKey);
  };

  const handleFilterChange = useCallback(() => {
    const localStorageData = getDoneRecipes();
    if (filter !== 'All') {
      const newResult = localStorage.filter(({ type }) => type === filter);
      setResult(newResult);
    } else {
      setResult(localStorageData);
    }
  }, [filter, setResult]);

  useEffect(() => {
    getDoneRecipes();
  }, []);

  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  return (
    <div>
      <Header>
        DoneRecipes
      </Header>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setFilter('All') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        type="button"
        onClick={ () => setFilter('Meals') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setFilter('Drinks') }
      >
        Drinks
      </button>

      {result?.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link
            to={
              recipe.type === 'meal'
                ? `/meals/${recipe.id}`
                : `/drinks/${recipe.id}`
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
