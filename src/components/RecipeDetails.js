import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function RecipeDetails() {
  const [details, setDetails] = useState([]);
  const [num, setNum] = useState('');
  console.log(details);
  const history = useHistory();
  const { pathname } = history.location;

  function getIdOnPathname(id) {
    const numsStr = id.replace(/[^0-9]/g, '');
    setNum(numsStr);
    return numsStr;
  }

  useLayoutEffect(() => {
    const id = getIdOnPathname(pathname);
    const fetchIdRecipe = async () => {
      const endPoint = pathname === `/meals/${id}`
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        : (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await fetch(endPoint);
      const result = await data.json();
      setDetails(result);
    };
    fetchIdRecipe();
  }, [pathname]);

  return (
    <div>

      {(details?.length > 0 && pathname === `/meals/${num}`)
          && (
            details.meals.map((e, i) => (
              <div key={ e.idMeal }>
                <img
                  data-testid="recipe-photo"
                  src={ e.strMealThumb }
                  alt={ e.strMeal }
                />
                <p data-testid="recipe-title">{e.strMeal}</p>
                <p data-testid="recipe-category">{`Category: ${e.strCategory}`}</p>
                <ul data-testid={ `${i}-ingredient-name-and-measure` }>

                  {
                    Object.keys(details.meals[0]).filter((el) => (
                      el.includes('strIngredient') && details.meals[0][el].length !== 0))
                      .map((elem, ind) => <li key={ ind }>{details.meals[0][elem]}</li>)
                  }
                </ul>
                <p data-testid="instructions">{e.strInstructions}</p>
                {console.log(e.strYoutube)}
                <div>
                  <iframe
                    data-testid="video"
                    width="100%"
                    height="425"
                    title={ e.strMeal }
                    src={ e.strYoutube.replace('watch?v=', 'embed/') }
                  />
                </div>
              </div>
            ))
          )}
      {(details?.length > 0 && pathname === `/drinks/${num}`)
          && (
            details.drinks.map((e, i) => (
              <div key={ e.idDrink }>
                <img
                  data-testid="recipe-photo"
                  src={ e.strDrinkThumb }
                  alt={ e.strDrink }
                />
                <p data-testid="recipe-title">{e.strDrink}</p>
                <p data-testid="recipe-category">{`Category: ${e.strCategory}`}</p>
                <ul data-testid={ `${i}-ingredient-name-and-measure` }>
                  {console.log(Object.keys(details.drinks[0]))}
                  {
                    Object.keys(details.drinks[0]).filter((el) => (
                      el.includes('strIngredient') && details.drinks[0][el] !== null))
                      .map((elem, ind) => <li key={ ind }>{details.drinks[0][elem]}</li>)
                  }
                </ul>
                <p data-testid="instructions">{e.strInstructions}</p>
              </div>
            ))
          )}
    </div>
  );
}
