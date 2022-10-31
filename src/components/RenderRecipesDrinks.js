import React, { useContext } from 'react';
import Context from '../context/Context';

export default function RenderRecipesDrinks() {
  const { resultFilterDrinks } = useContext(Context);
  return (
    <div>
      {
        resultFilterDrinks
        && resultFilterDrinks.map((e, i) => (
          <div
            data-testid={ `${i}-recipe-card` }
            key={ e.idDrink }
          >
            <img
              data-testid={ `${i}-card-img` }
              src={ e.strDrinkThumb }
              alt={ e.strDrink }
            />
            <p data-testid={ `${i}-card-name` }>{e.strDrink }</p>
          </div>
        ))
      }
    </div>
  );
}
