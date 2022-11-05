import React, { useContext } from 'react';
import Context from '../context/Context';

export default function RecipeInProgress() {
  const { recipesList } = useContext(Context);
  console.log(recipesList);
  return (
    <div>
      <div>
        <img
          src={ recipesList[0].strMealThumb || recipesList[0].strDrinkThumb }
          alt={ recipesList[0].strMeal || recipesList[0].strDrink }
          data-testid="recipe-photo"
        />
        <p data-testid="recipe-title">
          {recipesList[0].strMeal
        || recipesList[0].strDrink}
        </p>
      </div>
    </div>
  );
}
