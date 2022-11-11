import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { setLocalStorage, getLocalStorage } from '../services/LocalStorage';
import ButtonFavoriteAndShare from './ButtonFavoriteAndShare';

export default function RecipeInProgress() {
  const [details, setDetails] = useState({});
  const [inProgressRecipes, setInProgressRecipes] = useState({});

  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.replace(/[^0-9]/g, '');

  const INITIAL_STATE = {
    drinks: {},
    meals: {},
  };

  useEffect(() => {
    const fetchIdRecipe = async () => {
      const endPoint = pathname === `/meals/${id}/in-progress`
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        : (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await fetch(endPoint);
      const result = await data.json();
      setDetails(result);
    };
    fetchIdRecipe();
  }, [id, pathname, setDetails]);

  const path = pathname.includes('meals') ? 'meals' : 'drinks';

  useEffect(() => {
    const localStorageInProgress = getLocalStorage('inProgressRecipes')
      ? getLocalStorage('inProgressRecipes') : INITIAL_STATE;
    setInProgressRecipes(localStorageInProgress);
  }, []);

  useEffect(() => {
    setLocalStorage('inProgressRecipes', inProgressRecipes);
  }, [inProgressRecipes]);

  const handleCick = ({ target }) => {
    const { checked } = target;
    const ingredients = target.parentNode.innerText;
    const prev = inProgressRecipes[path][id] ? inProgressRecipes[path][id] : [];
    if (checked) {
      target.parentNode.className = 'checked';
      const newList = [...prev, ingredients];
      setInProgressRecipes({
        ...inProgressRecipes,
        [path]: {
          [id]: newList,
        },
      });
    } else {
      target.parentNode.className = 'no-checked';
      const newList = inProgressRecipes[path][id]
        .filter((e) => e !== ingredients);
      setInProgressRecipes({
        ...inProgressRecipes,
        [path]: {
          [id]: newList,
        },
      });
    }
  };

  const handleCheck = (ingredient) => {
    const localStorageInProgress = getLocalStorage('inProgressRecipes');
    if (localStorageInProgress[path][id]) {
      return localStorageInProgress[path][id].includes(ingredient);
    }
    return false;
  };

  return (
    <div>
      <ButtonFavoriteAndShare />
      {(details.drinks || details.meals)
          && (details.meals || details.drinks).map((e) => {
            const objNames = pathname === `/meals/${id}/in-progress` ? {
              id: 'idMeal',
              name: 'strMeal',
              image: 'strMealThumb',
              category: 'strCategory',
              instructions: 'strInstructions',
              youtube: 'strYoutube',
            } : {
              id: 'idDrink',
              name: 'strDrink',
              image: 'strDrinkThumb',
              category: 'strAlcoholic',
              instructions: 'strInstructions',
            };
            return (
              <div key={ `${e[objNames.id]}` }>
                <img
                  data-testid="recipe-photo"
                  src={ e[objNames.image] }
                  alt={ e[objNames.name] }
                />
                <p data-testid="recipe-title">{e[objNames.name]}</p>
                <h3>Ingredients</h3>
                {
                  Object.keys(e).filter((el) => (
                    el.includes('strIngredient') && e[el] !== '' && e[el] !== null))
                    .map((elem, ind) => (

                      <label
                        key={ ind }
                        data-testid={ `${ind}-ingredient-step` }
                        htmlFor={ elem }
                        className={ handleCheck(e[elem]) ? 'checked' : 'no-checked' }
                      >
                        <input
                          data-testid={ `${ind}-ingredient-step` }
                          type="checkbox"
                          name={ elem }
                          id={ elem }
                          defaultChecked={ handleCheck(e[elem]) }
                          onClick={ handleCick }
                        />

                        <p>
                          {e[elem]}
                        </p>
                      </label>

                    ))
                }
                <p data-testid="recipe-category">{`Category: ${e[objNames.category]}`}</p>
                <p data-testid="instructions">{e[objNames.instructions]}</p>
                <button
                  type="button"
                  data-testid="finish-recipe-btn"
                  className="btn-start-recipe"
                >
                  Finalizar Receita
                </button>
              </div>
            );
          })}
    </div>
  );
}
