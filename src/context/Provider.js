import React, { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchAPI from '../services/FetchAPI';

function Provider({ children }) {
  const [mealsRecipes, setmealsRecipes] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [resultFilterDrinks, setResultFilterDrinks] = useState([]);
  const [resultFilterMeals, setResultFilterMeals] = useState([]);
  const [recipesList, setRecipesList] = useState([]);
  const [idPathname, setIdPathname] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [details, setDetails] = useState({});
  const [isDisableImg, setIsDisableImg] = useState(true);
  const [favoriteRecipes, setFavoriteRecipes] = useState({});

  useEffect(() => {
    const getAPI = async (url) => {
      const result = await fetchAPI(url);
      setmealsRecipes(result);
    };
    getAPI('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  }, []);

  const context = useMemo(
    () => ({
      mealsRecipes,
      inputSearch,
      resultFilterDrinks,
      resultFilterMeals,
      recipesList,
      recommendation,
      idPathname,
      details,
      isDisableImg,
      favoriteRecipes,
      setFavoriteRecipes,
      setIsDisableImg,
      setDetails,
      setIdPathname,
      setRecommendation,
      setRecipesList,
      setResultFilterMeals,
      setResultFilterDrinks,
      setInputSearch,
    }),
    [details, favoriteRecipes, idPathname,
      inputSearch, isDisableImg, mealsRecipes,
      recipesList, recommendation, resultFilterDrinks, resultFilterMeals],
  );
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
