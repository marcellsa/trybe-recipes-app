// import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// import Context from '../context/Context';

export default function RecipeDetails() {
  const [details, setDetails] = useState([]);
  // console.log(details);
  const history = useHistory();
  const { pathname } = history.location;

  function getIdOnPathname(id) {
    const numsStr = id.replace(/[^0-9]/g, '');
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
  }, [pathname]);

  return (
    <div>RecipeDetails</div>
  );
}
