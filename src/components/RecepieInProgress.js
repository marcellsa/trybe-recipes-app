import React, { useContext } from 'react';
import Context from '../context/Context';

export default function RecipeInProgress() {
  const { recipesList } = useContext(Context);
  console.log(recipesList);
  return (
    <div>
      {
        <img
          src={ recipesList[0].strMealThumb || recipesList[0].strDrinkThumb }
          alt={ recipesList[0].strMeal || recipesList[0].strDrink }
          data-testid="recipe-photo"
        />
        <h3
        data-testid="recipe-title"
        >
        { recipesList[0]strMeal || recipesList[0]strDrink }
      </h3>
        /*
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      { (pageType === 'meals') && (
      <h3>
        {category.meals}
      </h3>
      )
      }

      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
      <h4 data-testid="recipe-category">{}</h4>
      {
        ingredients.map((element, index) => {
          if (element) {
            return (
              <div key={ index }>
                <label
                  data-testid={ `${index}-ingredient-step` }
                  htmlFor={ element }
                  className="strikethrough"
                >
                  <input
                    className="check-ingredient"
                    name={ element }
                    type="checkbox"
                    id={ element }
                  />
                  {element}
                </label>
              </div>
            );
          } return null;
        })
      }
      <div>
        <h2
          data-testid="instructions"
        >
          {' '}
          Instruções
          {' '}

        </h2>
      </div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar
      </button> */}
    </div>
  );
}
