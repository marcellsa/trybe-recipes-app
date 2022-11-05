import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import ButtonFavoriteAndShare from './ButtonFavoriteAndShare';
import CardRecommedation from './CardRecommedation';

export default function RecipeDetails() {
  const { setRecommendation,
    idPathname, details, setDetails } = useContext(Context);

  const history = useHistory();
  const { pathname } = history.location;
  // console.log(pathname);

  const id = pathname.replace(/[^0-9]/g, '');

  useEffect(() => {
    const fetchIdRecipe = async () => {
      const endPoint = pathname === `/meals/${id}`
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        : (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await fetch(endPoint);
      const result = await data.json();
      setDetails(result);
    };
    fetchIdRecipe();
  }, [id, pathname, setDetails]);

  useEffect(() => {
    const fetchRecommendation = async () => {
      const endPoint = pathname === `/meals/${id}`
        ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
        : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(endPoint);
      const result = await response.json();
      const { meals, drinks } = result;
      const type = meals || drinks;
      const numCards = 6;
      setRecommendation(type.slice(0, numCards));
    };
    fetchRecommendation();
  }, [id, pathname, setRecommendation]);

  return (
    <div>
      <ButtonFavoriteAndShare />
      {(details.drinks || details.meals)
          && (details.meals || details.drinks).map((e) => {
            const objNames = pathname === `/meals/${id}` ? {
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
                <p data-testid="recipe-category">{`Category: ${e[objNames.category]}`}</p>
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
                <p data-testid="instructions">{e[objNames.instructions]}</p>

                {pathname === `/meals/${idPathname}` && (
                  <iframe
                    data-testid="video"
                    title={ e[objNames.name] }
                    src={ e.strYoutube.replace('watch?v=', 'embed/') }
                  />)}

              </div>
            );
          })}
      <CardRecommedation />
    </div>
  );
}
