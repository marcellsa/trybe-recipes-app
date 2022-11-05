import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ButtonStartRecipe() {
  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.replace(/[^0-9]/g, '');

  const handleClick = () => {
    if (pathname.includes('meals')) {
      history.push(`/meals/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  // const handleDisable = () => {
  //   const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  //   const result = recipes.some((e) => e.id === id);
  //   return result;
  // };

  return (
    <div>

      <button
        // disabled={ handleDisable }
        className="btn-start-recipe"
        onClick={ handleClick }
        data-testid="start-recipe-btn"
        type="button"
      >
        Start Recipe
      </button>

    </div>
  );
}
