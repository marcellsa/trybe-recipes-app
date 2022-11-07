import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
// import Context from '../context/Context';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function Favorite() {
  const [filter, setFilter] = useState([]);
  // const [favorite, setFavorite] = useState(false);
  const [copy, setCopy] = useState(false);

  // const { favoriteRecipes, setFavoriteRecipes } = useContext(Context);

  const localStorageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  // console.log(localStorageFavorite);
  useEffect(() => {
    setFilter(localStorageFavorite);
  }, []);

  const handleClickMeals = () => {
    const meal = localStorageFavorite.filter((e) => e.type === 'meal');
    setFilter(meal);
  };

  const handleClickDrinks = () => {
    const drink = localStorageFavorite.filter((e) => e.type === 'drink');
    setFilter(drink);
  };

  const handleClickAll = () => {
    setFilter(localStorageFavorite);
  };

  // const checkIfIsFavorite = () => (favorite && blackHeartIcon);

  const handleToggleFavorite = ({ target }) => {
    // setFavorite((previous) => !previous);
    const resultFilter = localStorageFavorite.filter((e) => e.id !== target.id);

    setFilter(resultFilter);
    localStorage.setItem('favoriteRecipes', JSON.stringify(resultFilter));
  };

  const copyToClipboard = ({ id, type }) => {
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`).then(() => {
      setCopy(true);
    });
  };

  return (
    <div>
      <Header>
        Favorite Recipes
      </Header>

      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ handleClickAll }
        >
          All
        </button>

        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ handleClickMeals }
        >
          Meals
        </button>

        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ handleClickDrinks }
        >
          Drinks
        </button>
        {filter
          && filter.map((e, i) => (
            <div key={ e.id }>
              {/* <p>{e.id}</p> */}

              <Link to={ `/${e.type}s/${e.id}` }>
                <p data-testid={ `${i}-horizontal-name` }>{e.name}</p>
                <img
                  style={ { maxWidth: '50px' } }
                  data-testid={ `${i}-horizontal-image` }
                  src={ e.image }
                  alt={ e.name }
                />

                <div data-testid={ `${i}-horizontal-top-text` }>
                  <p>{`${e.nationality} - ${e.category}`}</p>
                </div>
              </Link>

              {
                e.type === 'drink'
              && <p data-testid={ `${i}-horizontal-top-text` }>{e.alcoholicOrNot}</p>
              }

              <button
                // className="btn-favorite"
                type="button"
                onClick={ () => copyToClipboard(e) }
              >
                <img
                  data-testid={ `${i}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share"
                  id={ e.id }
                />
              </button>

              <button
                className="btn-favorite"
                type="button"
                onClick={ handleToggleFavorite }
              >
                <img
                  data-testid={ `${i}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="favorite"
                  id={ e.id }
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
            </div>))}
      </div>
    </div>
  );
}
