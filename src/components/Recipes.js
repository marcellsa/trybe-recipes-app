import React, { useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Context from '../context/Context';

let arrCateg = [];

function Recipes() {
  const doze = 12; // número de receitas

  const { returnAPI, mealOrDrink, category, setReturnAPI,
    doRedirect, setDoRedirect } = useContext(Context);

  const handleKeyObj = (str) => { // lida com o nome da chave do objeto retornado da api
    const keyObj = `${str + mealOrDrink.charAt(0).toUpperCase() + mealOrDrink.slice(1)}`;
    return keyObj;
  };

  const getCategories = async (endpoint) => { // requisição à API com o endpoint como parâmetro
    const response = await fetch(endpoint);
    const json = await response.json();
    setDoRedirect(false); // não irá redirecionar para a tela de detalhes da receita caso apareça apenas uma ao clicar em alguma categoria
    return json;
  };

  const filterReset = async () => { // função que "reseta" os filtros fazendo a chamada à api como se não houvesse filtro escolhido
    if (mealOrDrink === 'meal') {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      return setReturnAPI(await getCategories(url));
    }
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    setReturnAPI(await getCategories(url));
  };

  const filterCategory = async (categ) => { // função que escolhe a url correta com a categoria correta para realizar o fetch
    arrCateg.push(categ);

    if (arrCateg[arrCateg.length - 1] !== arrCateg[arrCateg.length - 2]) {
      if (mealOrDrink === 'meal') {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categ}`;
        return setReturnAPI(await getCategories(url));
      }
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categ}`;
      return setReturnAPI(await getCategories(url));
    }
    arrCateg = [];
    return filterReset();
  };

  return (
    <div>
      <div>
        { category !== '' // caso category não seja uma string vazia, irá realizar o map dos botões das categorias
          && (
            category.map((cat) => (
              <button
                key={ cat.strCategory }
                type="button"
                data-testid={ `${cat.strCategory}-category-filter` }
                onClick={ () => filterCategory(cat.strCategory) }
              >
                { cat.strCategory }
              </button>
            ))) }

        <button // botão de resetar os filtros
          data-testid="All-category-filter"
          type="button"
          onClick={ filterReset }
        >
          All
        </button>

      </div>

      { returnAPI[`${mealOrDrink}s`] === null
        && global.alert('Sorry, we haven\'t found any recipes for these filters.') }

      {
        (returnAPI && returnAPI[`${mealOrDrink}s`] !== null && doRedirect) // caso tenha apenas 1 receita, redirecionar para a pagina de detalhes dela
        && (
          (returnAPI[`${mealOrDrink}s`].length === 1)
          && (
            <Redirect
              to={ mealOrDrink === 'meal'
                ? (
                  `/foods/${returnAPI[`${mealOrDrink}s`][0][handleKeyObj('id')]}`
                )
                : (
                  `/drinks/${returnAPI[`${mealOrDrink}s`][0][handleKeyObj('id')]}`) }
            />
          )
        )
      }

      {
        (returnAPI && returnAPI[`${mealOrDrink}s`] !== null) // caso tenha múltiplas receitas
        && (
          (returnAPI[`${mealOrDrink}s`]).slice(0, doze).map((recipe, i) => (
            <Link
              key={ recipe[handleKeyObj('id')] }
              to={ mealOrDrink === 'meal'
                ? (
                  `/foods/${recipe[handleKeyObj('id')]}`
                )
                : (
                  `/drinks/${recipe[handleKeyObj('id')]}`) }
            >
              <div data-testid={ `${i}-recipe-card` }>
                <img
                  data-testid={ `${i}-card-img` }
                  style={ { width: '100px' } } // provisório
                  src={ recipe[`${handleKeyObj('str')}Thumb`] }
                  alt={ recipe[handleKeyObj('str')] }
                />
                <p data-testid={ `${i}-card-name` }>
                  { recipe[handleKeyObj('str')] }
                </p>
              </div>
            </Link>
          ))
        )
      }
    </div>
  );
}

export default Recipes;
