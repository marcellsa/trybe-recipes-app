import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Provider from '../context/Provider';
import renderWithRouter from './mocks/renderWithRouter';
import inicialFoods from './mockData/mockAllData';
import mealCategories from '../../cypress/mocks/mealCategories';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import beefMeals from '../../cypress/mocks/beefMeals';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import lemonsDrink from './mockData/lemonDrink';
import ginDrinks from '../../cypress/mocks/ginDrinks';
import letterDrink from './mockData/letterDrink';
import drinkDetails from './mockData/drinkDetails';
import emptyDrinks from '../../cypress/mocks/emptyDrinks';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import oneDrink from '../../cypress/mocks/oneDrink';
import letterMeal from './mockData/letterMeal';

describe('Teste o componente Recipes', () => {
  test('Se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/foods');

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(inicialFoods),
        });
      }

      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(mealCategories),
        });
      }

      if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(chickenMeals),
        });
      }
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s='));

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId('search-input');
    userEvent.type(inputSearch, 'chicken');

    const searchButton = screen.getByRole('button', { name: /buscar/i });

    const radioIngredient = screen.getByLabelText(/ingredient/i);

    userEvent.click(radioIngredient);

    userEvent.click(searchButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken'));

    const allCategoryButton = screen.getByTestId('All-category-filter');

    userEvent.click(allCategoryButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s='));

    global.fetch.mockRestore();
  });

  test('Exiba um `alert` caso nenhuma receita seja encontrada pelo radio Ingrediente', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/foods');

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(inicialFoods),
        });
      }

      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(mealCategories),
        });
      }

      if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=xablau') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(emptyMeals),
        });
      }
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s='));

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId('search-input');
    userEvent.type(inputSearch, 'xablau');

    const searchButton = screen.getByRole('button', { name: /buscar/i });

    const radioIngredient = screen.getByLabelText(/ingredient/i);

    userEvent.click(radioIngredient);

    userEvent.click(searchButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=xablau'));

    await waitFor(() => expect(alertMock).toHaveBeenCalled());

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.'));

    global.fetch.mockRestore();
  });

  test('Exiba um `alert` caso nenhuma receita seja encontrada pelo radio Name', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/foods');

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(inicialFoods),
        });
      }

      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(mealCategories),
        });
      }

      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(emptyMeals),
        });
      }
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s='));

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId('search-input');
    userEvent.type(inputSearch, 'xablau');

    const searchButton = screen.getByRole('button', { name: /buscar/i });

    const radioName = screen.getByText(/name/i);

    userEvent.click(radioName);

    userEvent.click(searchButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=xablau'));

    const allCategoryButton = screen.getByTestId('All-category-filter');

    userEvent.click(allCategoryButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s='));

    await waitFor(() => expect(alertMock).toHaveBeenCalled());

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.'));

    global.fetch.mockRestore();
  });

  test('Na tela de Foods, se o radio selecionado for First letter, com apenas uma letra', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/foods');

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(inicialFoods),
        });
      }

      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(mealCategories),
        });
      }

      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=a') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(letterMeal),
        });
      }
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s='));

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId('search-input');
    userEvent.type(inputSearch, 'a');

    const searchButton = screen.getByRole('button', { name: /buscar/i });

    const radioLetter = screen.getByTestId('first-letter-search-radio');

    userEvent.click(radioLetter);

    userEvent.click(searchButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a'));

    screen.logTestingPlaygroundURL();

    global.fetch.mockRestore();
  });

  test('Se a busca por cateroria Beef retorna as opções de BeefMeals', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/foods');

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(inicialFoods),
        });
      }

      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(mealCategories),
        });
      }

      if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(beefMeals),
        });
      }
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s='));

    const beefCategory = screen.getByRole('button', {
      name: /beef/i,
    });

    userEvent.click(beefCategory);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef'));

    const getFirstBeefMeals = screen.getByRole('img', {
      name: /beef and mustard pie/i,
    });

    expect(getFirstBeefMeals).toBeDefined();

    const allCategoryButton = screen.getByTestId('All-category-filter');

    userEvent.click(allCategoryButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s='));

    // screen.logTestingPlaygroundURL()

    global.fetch.mockRestore();
  });

  test('Se a busca por Name e detalhes de uma única receita de Foods', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/foods');

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(inicialFoods),
        });
      }

      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(mealCategories),
        });
      }

      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'
|| url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(oneMeal),
        });
      }

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(drinks),
        });
      }
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s='));

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId('search-input');

    userEvent.type(inputSearch, 'Arrabiata');

    const nameRadio = screen.getByRole('radio', {
      name: /name/i,
    });

    userEvent.click(nameRadio);

    const searchButton = screen.getByRole('button', {
      name: /buscar/i,
    });

    userEvent.click(searchButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      . toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'));

    // screen.logTestingPlaygroundURL()

    global.fetch.mockRestore();
  });

  test('Teste a pagina de busca de Drinks por ingrediente sem encontrar resultado', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/drinks');

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(drinks),
        });
      }

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(drinkCategories),
        });
      }

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=xablau') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(emptyDrinks),
        });
      }
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));

    const searchIcon = screen.getByRole('img', {
      name: /icon\-search/i,
    });

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId('search-input');

    userEvent.type(inputSearch, 'xablau');

    const searchButton = screen.getByRole('button', {
      name: /buscar/i,
    });

    const radioIngredient = screen.getByLabelText(/ingredient/i);

    userEvent.click(radioIngredient);

    userEvent.click(searchButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=xablau'));

    await waitFor(() => expect(alertMock).toHaveBeenCalled());

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.'));

    global.fetch.mockRestore();
  });

  test('Teste a pagina de busca de Drinks por ingrediente', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/drinks');

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(drinks),
        });
      }

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(drinkCategories),
        });
      }

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(lemonsDrink),
        });
      }
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));

    const searchIcon = screen.getByRole('img', {
      name: /icon\-search/i,
    });

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId('search-input');

    userEvent.type(inputSearch, 'lemon');

    const searchButton = screen.getByRole('button', {
      name: /buscar/i,
    });

    const radioIngredient = screen.getByLabelText(/ingredient/i);

    userEvent.click(radioIngredient);

    userEvent.click(searchButton);
    // screen.logTestingPlaygroundURL()

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon'));

    global.fetch.mockRestore();
  });

  test('Teste a pagina de busca de Drinks por nome', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/drinks');

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(drinks),
        });
      }

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(drinkCategories),
        });
      }

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(ginDrinks),
        });
      }

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(emptyDrinks),
        });
      }
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));

    const firstInitialDrink = screen.getByRole('img', {
      name: /gg/i,
    });

    expect(firstInitialDrink).toBeDefined();

    const searchIcon = screen.getByRole('img', {
      name: /icon\-search/i,
    });

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId('search-input');

    userEvent.type(inputSearch, 'gin');

    const searchButton = screen.getByRole('button', {
      name: /buscar/i,
    });

    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });

    userEvent.click(radioName);

    userEvent.click(searchButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin'));

    const allCategoryButton = screen.getByTestId('All-category-filter');

    userEvent.click(allCategoryButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));

    userEvent.clear(inputSearch);

    userEvent.type(inputSearch, 'xablau');

    userEvent.click(radioName);

    userEvent.click(searchButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau'));

    await waitFor(() => expect(alertMock).toHaveBeenCalled());

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.'));

    screen.logTestingPlaygroundURL();

    global.fetch.mockRestore();
  });

  test('Teste a pagina de busca de Drinks por letra e detalhes da receita', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/drinks');

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(drinks),
        });
      }

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(drinkCategories),
        });
      }

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(letterDrink),
        });
      }

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17222') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(drinkDetails),
        });
      }

      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(inicialFoods),
        });
      }
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));

    const firstInitialDrink = screen.getByRole('img', {
      name: /gg/i,
    });

    expect(firstInitialDrink).toBeDefined();

    const searchIcon = screen.getByRole('img', {
      name: /icon\-search/i,
    });

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId('search-input');

    userEvent.type(inputSearch, 'a');

    const searchButton = screen.getByRole('button', {
      name: /buscar/i,
    });

    const radioLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });

    userEvent.click(radioLetter);

    userEvent.click(searchButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a'));

    const firstOptionResult = screen.getByRole('img', {
      name: /a1/i,
    });

    userEvent.click(firstOptionResult);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17222'));

    // screen.logTestingPlaygroundURL()

    global.fetch.mockRestore();
  });

  test('Testa a tela de Drink com o filtro de categoria', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/drinks');

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(drinks),
        });
      }

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(drinkCategories),
        });
      }

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(ordinaryDrinks),
        });
      }
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));

    const firstCategoryDrink = screen.getByTestId('Ordinary Drink-category-filter');

    userEvent.click(firstCategoryDrink);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink'));

    const allCategoryButton = screen.getByTestId('All-category-filter');

    userEvent.click(allCategoryButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));

    // screen.logTestingPlaygroundURL()

    global.fetch.mockRestore();
  });

  test('Se a busca por Name e detalhes de uma única receita de Drink', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/drinks');

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(drinks),
        });
      }

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(drinkCategories),
        });
      }

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine'
|| url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(oneDrink),
        });
      }

      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(inicialFoods),
        });
      }
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId('search-input');

    userEvent.type(inputSearch, 'Aquamarine');

    const nameRadio = screen.getByRole('radio', {
      name: /name/i,
    });

    userEvent.click(nameRadio);

    const searchButton = screen.getByRole('button', {
      name: /buscar/i,
    });

    userEvent.click(searchButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s='));
  });

  test('Teste a pagina de busca Food com mais de uma letra, deve ocorrer um alerta', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/foods');

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(inicialFoods),
        });
      }

      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(mealCategories),
        });
      }

      if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=null') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(emptyMeals),
        });
      }
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s='));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list'));

    const iconSearch = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId('search-input');

    userEvent.type(inputSearch, 'asdfg');

    const radioLetter = screen.getByTestId('first-letter-search-radio');

    userEvent.click(radioLetter);

    const btnSearch = screen.getByTestId('exec-search-btn');

    userEvent.click(btnSearch);

    await waitFor(() => expect(alertMock).toHaveBeenCalled());

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith('Your search must have only 1 (one) character'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=null'));

    await waitFor(() => expect(alertMock).toHaveBeenCalled());

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith('Your search must have only 1 (one) character'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=null'));

    await waitFor(() => expect(alertMock).toHaveBeenCalled());

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.'));

    screen.logTestingPlaygroundURL();
  });

  test('Teste a pagina de busca Drink com mais de uma letra, deve ocorrer um alerta', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/drinks');

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(drinks),
        });
      }

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(drinkCategories),
        });
      }

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=null') {
        return Promise.resolve({
          json: jest.fn().mockResolvedValueOnce(emptyDrinks),
        });
      }
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'));

    const iconSearch = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId('search-input');

    userEvent.type(inputSearch, 'asdfg');

    const radioLetter = screen.getByTestId('first-letter-search-radio');

    userEvent.click(radioLetter);

    const btnSearch = screen.getByTestId('exec-search-btn');

    userEvent.click(btnSearch);

    await waitFor(() => expect(alertMock).toHaveBeenCalled());

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith('Your search must have only 1 (one) character'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=null'));

    await waitFor(() => expect(alertMock).toHaveBeenCalled());

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith('Your search must have only 1 (one) character'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => expect(global.fetch)
      .toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=null'));

    await waitFor(() => expect(alertMock).toHaveBeenCalled());

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.'));

    screen.logTestingPlaygroundURL();
  });
});
