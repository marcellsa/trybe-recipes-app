import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

// const DONE_RECIPES_KEY_TEST = [
//   {
//     id: '52771',
//     type: 'meal',
//     nationality: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//     doneDate: '23/06/2020',
//     tags: ['Pasta', 'Curry'],
//   },
//   {
//     id: '178319',
//     type: 'drink',
//     nationality: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Aquamarine',
//     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//     doneDate: '23/06/2020',
//     tags: [],
//   },
// ];

// // localStorage.setItem será usado apenas para desenvolvimento e teste. Será retirado depois
// localStorage.setItem('doneRecipes', JSON.stringify(DONE_RECIPES_KEY_TEST));

export default function DoneRecipes() {
  const [filterButton, setFilterButton] = useState('All');
  const [localStorageData, setLocalStorageData] = useState([]);
  const [copiedLink, setCopiedLink] = useState(false);

  const getDoneRecipes = () => {
    const doneRecipesInfo = localStorage.getItem('doneRecipes');
    return JSON.parse(doneRecipesInfo);
  };

  const getData = useCallback(() => {
    const data = getDoneRecipes();
    setLocalStorageData(data);
  }, [setLocalStorageData]);

  const handleFilterButtonChange = useCallback(() => {
    const newData = getDoneRecipes();
    if (filterButton !== 'All') {
      const results = newData.filter(({ type }) => type === filterButton);
      setLocalStorageData(results);
    } else {
      setLocalStorageData(newData);
    }
  }, [filterButton, setLocalStorageData]);

  useEffect(() => {
    getData();
    handleFilterButtonChange();
  }, [getData, handleFilterButtonChange]);

  // useEffect(() => {
  //   handleFilterButtonChange();
  // }, [handleFilterButtonChange]);

  const handleShareIcon = ({ type, id }) => {
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`).then(() => {
      setCopiedLink(true);
    });
  };

  return (
    <div>
      <Header>
        Done Recipes
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
        onClick={ () => setFilterButton('meal') }
      >
        Meals
      </button>

      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setFilterButton('drink') }
      >
        Drinks
      </button>

      {localStorageData.length !== 0 && localStorageData.map((recipe, index) => (
        <div key={ index }>
          <Link
            to={ recipe.type === 'meal'
              ? `/meals/${recipe.id}` : `/drinks/${recipe.id}` }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt="imagem da receita"
              width="250px"
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}`
              : `${recipe.alcoholicOrNot}`}
          </p>
          <Link
            to={ recipe.type === 'meal'
              ? `/meals/${recipe.id}` : `/drinks/${recipe.id}` }
          >
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

          <button type="button" onClick={ () => handleShareIcon(recipe) }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="ícone de compartilhamento"
            />
          </button>
          {copiedLink && <p><strong>Link copied!</strong></p>}
          <ul>
            {recipe?.tags.map((tag) => (
              <li
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      ))}

    </div>
  );
}
