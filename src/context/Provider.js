import React, { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchAPI from '../services/FetchAPI';

function Provider({ children }) {
  const [mealsRecipes, setmealsRecipes] = useState([]);

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
    }),
    [mealsRecipes],
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
