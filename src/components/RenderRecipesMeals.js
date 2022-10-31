import React, { useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

export default function RenderRecepies() {
  const { resultFilterMeals } = useContext(Context);

  return (
    <div>
      {
        resultFilterMeals
        && resultFilterMeals.map((e, i) => (
          <div
            data-testid={ `${i}-recipe-card` }
            key={ e.idMeal }
          >
            <img
              data-testid={ `${i}-card-img` }
              src={ e.strMealThumb }
              alt={ e.strMeal }
            />
            <p data-testid={ `${i}-card-name` }>{e.strMeal }</p>
          </div>
        ))
      }
    </div>
  );
}
