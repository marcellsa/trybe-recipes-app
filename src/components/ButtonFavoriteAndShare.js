import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Context from '../context/Context';

export default function ButtonFavoriteAndShare() {
  const [favorite, setFavorite] = useState(false);
  const [copy, setCopy] = useState(false);
  // const [favoriteRecipes, setFavoriteRecipes] = useState({});
  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.replace(/[^0-9]/g, '');
  const six = 6;
  const mealOrDrink = pathname.slice(1, six) === 'meals' ? 'meals' : 'drinks';

  const { details, favoriteRecipes, setFavoriteRecipes } = useContext(Context);
  // PRECISA SER REFATORADO
  useEffect(() => {
    if (Object.keys(details)[0] === mealOrDrink) {
      const objFavoriteRecipes = {
        id: mealOrDrink === 'meals' ? details.meals[0].idMeal : details.drinks[0].idDrink,
        type: mealOrDrink.substring(0, mealOrDrink.length - 1),
        nationality: mealOrDrink === 'meals' ? details.meals[0].strArea : '',
        category: mealOrDrink === 'meals'
          ? details.meals[0].strCategory : details.drinks[0].strCategory,
        alcoholicOrNot: mealOrDrink === 'drinks' ? details.drinks[0].strAlcoholic : '',
        name: mealOrDrink === 'meals'
          ? details.meals[0].strMeal : details.drinks[0].strDrink,
        image: mealOrDrink === 'meals'
          ? details.meals[0].strMealThumb : details.drinks[0].strDrinkThumb,
      };
      setFavoriteRecipes(objFavoriteRecipes);
    }
  }, [details, mealOrDrink]);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storage) setFavorite(storage.some((e) => e.id === id));
  }, [id]);

  const checkIfIsFavorite = () => (favorite ? blackHeartIcon : whiteHeartIcon);

  const handleToggleFavorite = () => {
    setFavorite((previous) => !previous);
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (storage) {
      if (storage.some((e) => e.id === id)) {
        const result = storage.filter((e) => e.id !== favoriteRecipes.id);
        return localStorage
          .setItem('favoriteRecipes', JSON.stringify(result));
      }
      return localStorage
        .setItem('favoriteRecipes', JSON.stringify([...storage, favoriteRecipes]));
    }
    return localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipes]));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopy(true);
    });
  };

  return (
    <div>
      <div>
        <button
          className="btn-favorite"
          type="button"
          onClick={ handleToggleFavorite }
        >
          <img data-testid="favorite-btn" src={ checkIfIsFavorite() } alt="favorite" />
        </button>
      </div>

      <button
        className="btn-favorite"
        type="button"
        onClick={ copyToClipboard }
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="share"
        />
      </button>
      {
        copy
        && (
          <p>
            Link copied!
          </p>
        )
      }
    </div>
  );
}
