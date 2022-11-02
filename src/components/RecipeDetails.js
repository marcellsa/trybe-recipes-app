import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
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
  }, [pathname, setDetails]);

  return (
    <div>
      {/* Precisa ser refatorado */}
      {(details?.length !== 0 && pathname === `/meals/${num}`)
          && (
            details.meals.map((e, i) => (
              <div key={ i }>
                <img
                  data-testid="recipe-photo"
                  src={ e.strMealThumb }
                  alt={ e.strMeal }
                />
                <p data-testid="recipe-title">{e.strMeal}</p>
                <p data-testid="recipe-category">{`Category: ${e.strCategory}`}</p>
                <div>
                  {
                    Object.keys(e).filter((el) => (
                      el.includes('strIngredient') && e[el] !== ''))
                      .map((elem, ind) => (
                        <p
                          data-testid={ `${ind}-ingredient-name-and-measure` }
                          key={ ind }
                        >
                          {e[elem]}
                        </p>))
                  }
                </div>
                <div>
                  {
                    Object.keys(e).filter((el) => (
                      el.includes('strMeasure') && e[el] !== ''))
                      .map((elem, ind) => (
                        <p
                          className="list-measure"
                          data-testid={ `${ind}-ingredient-name-and-measure` }
                          key={ ind }
                        >
                          {e[elem]}
                        </p>))
                  }
                </div>
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
      {(details?.length !== 0 && pathname === `/drinks/${num}`)
          && (
            details.drinks.map((e, i) => (
              <div key={ i }>
                <p>{i}</p>
                <img
                  data-testid="recipe-photo"
                  src={ e.strDrinkThumb }
                  alt={ e.strDrink }
                />
                <p data-testid="recipe-title">{e.strDrink}</p>
                <p data-testid="recipe-category">{e.strAlcoholic}</p>
                <div className="list-ingedients">
                  {
                    Object.keys(e).filter((el) => (
                      el.includes('strIngredient') && e[el] !== null))
                      .map((elem, ind) => (
                        <p
                          className="list-ingredients-drinks"
                          data-testid={ `${ind}-ingredient-name-and-measure` }
                          key={ ind }
                        >
                          {e[elem]}
                        </p>))
                  }
                </div>
                <div>
                  {
                    Object.keys(e).filter((el) => (
                      el.includes('strMeasure') && e[el] !== null))
                      .map((elem, ind) => (
                        <p
                          className="list-measure-drinks"
                          data-testid={ `${ind}-ingredient-name-and-measure` }
                          key={ ind }
                        >
                          {e[elem]}
                        </p>))
                  }
                </div>
                <p data-testid="instructions">{e.strInstructions}</p>
              </div>
            ))
          )}
    </div>
  );
}
