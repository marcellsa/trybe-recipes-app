import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Context from '../context/Context';
import SearchBar from '../components/SearchBar';
import App from '../App';

describe('Testa o componente SearchBar', () => {
  // beforeAll(() => {
  //   global.alert = jest.fn();
  // });

  // beforeEach(() => {
  //   global.fetch = jest.fn(fetch);
  // });

  const INITIAL_STATE = {
    inputSearch: '',
    setResultFilterDrinks: () => {},
    setResultFilterMeals: () => {},
  };

  const resolveLint = 'first-letter-search-radio';
  const resolveLint2 = 'password-input';
  const resolveLint3 = 'vasconaseriaa@gmail.com';
  const resolveLint4 = 'exec-search-btn';

  it('Verifica se existem 3 radio buttons e 1 button no searchBar', () => {
    renderWithRouter(
      <Context.Provider value={ INITIAL_STATE }>
        <SearchBar />
      </Context.Provider>,
    );

    const radioBtnIngredients = screen.getByTestId('ingredient-search-radio');
    const radioBtnName = screen.getByTestId('name-search-radio');
    const radioBtnFirstLetter = screen.getByTestId(resolveLint);

    expect(radioBtnFirstLetter).toBeInTheDocument();
    expect(radioBtnName).toBeInTheDocument();
    expect(radioBtnIngredients).toBeInTheDocument();
  });

  it('testa se a pesquisa é feita corretamentes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push = jest.fn();
    const emailInput = screen.getByRole('textbox');
    const passInput = screen.getByTestId(resolveLint2);
    const btnSubmit = screen.getByRole('button', { name: /enter/i });
    userEvent.type(emailInput, resolveLint3);
    userEvent.type(passInput, '12345678');
    userEvent.click(btnSubmit);

    const categoryBeef = await screen.findByTestId('Beef-category-filter');
    const categoryBreakfast = await screen.findByTestId('Breakfast-category-filter');
    const categoryChicken = await screen.findByTestId('Chicken-category-filter');
    const categoryDessert = await screen.findByTestId('Dessert-category-filter');
    const categoryGoat = await screen.findByTestId('Goat-category-filter');
    const categoryAll = await screen.findByTestId('All-category-filter');

    userEvent.click(categoryBeef);
    userEvent.click(categoryChicken);
    userEvent.click(categoryBreakfast);
    userEvent.click(categoryDessert);
    userEvent.click(categoryGoat);
    userEvent.click(categoryAll);

    const corba = await screen.findByRole('img', { name: /corba imagem/i });
    expect(corba).toBeInTheDocument();

    const searchBtn = screen.getByRole('img', { name: /search/i });
    userEvent.click(searchBtn);

    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'potato');
    expect(inputSearch).toBeInTheDocument();

    const radioBtnIngredients = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radioBtnIngredients);

    const execSearchBtn = screen.getByTestId(resolveLint4);
    expect(execSearchBtn).toBeInTheDocument();

    userEvent.click(execSearchBtn);

    await waitFor(() => {
      expect(history.push).toHaveBeenCalledWith('/meals/52782');
      expect(history.push).toHaveBeenCalled();
    });

    userEvent.type(inputSearch, 'p');
    expect(inputSearch).toBeInTheDocument();

    userEvent.click(screen.getByTestId(resolveLint));

    expect(execSearchBtn).toBeInTheDocument();

    userEvent.click(execSearchBtn);
  });

  it('testa se a pesquisa é feita corretamentes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push = jest.fn();
    const emailInput = screen.getByRole('textbox');
    const passInput = screen.getByTestId(resolveLint2);
    const btnSubmit = screen.getByRole('button', { name: /enter/i });
    userEvent.type(emailInput, resolveLint3);
    userEvent.type(passInput, '12345678');
    userEvent.click(btnSubmit);

    const searchBtn = screen.getByRole('img', { name: /search/i });
    userEvent.click(searchBtn);

    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'egg');
    expect(inputSearch).toBeInTheDocument();

    const radioBtnName = screen.getByTestId('name-search-radio');
    userEvent.click(radioBtnName);

    const execSearchBtn = screen.getByTestId(resolveLint4);
    expect(execSearchBtn).toBeInTheDocument();

    userEvent.click(execSearchBtn);

    const resultEgg = await screen.findByRole('img', { name: /egg drop soup/i });
    expect(resultEgg).toBeInTheDocument();
  });

  it('testa se a pesquisa é feita corretamente', async () => {
    global.alert = jest.fn();
    const { history } = renderWithRouter(<App />);
    history.push = jest.fn();
    const emailInput = screen.getByRole('textbox');
    const passInput = screen.getByTestId(resolveLint2);
    const btnSubmit = screen.getByRole('button', { name: /enter/i });
    userEvent.type(emailInput, resolveLint3);
    userEvent.type(passInput, '12345678');
    userEvent.click(btnSubmit);

    const searchBtn = screen.getByRole('img', { name: /search/i });
    userEvent.click(searchBtn);

    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'g');
    expect(inputSearch).toBeInTheDocument();

    const radioBtnFirstLetter = screen.getByTestId(resolveLint);
    userEvent.click(radioBtnFirstLetter);

    const execSearchBtn = screen.getByTestId(resolveLint4);
    expect(execSearchBtn).toBeInTheDocument();

    userEvent.click(execSearchBtn);

    const resultFirstLetter = await screen.findByRole('img', { name: /garides saganaki/i });

    expect(resultFirstLetter).toBeInTheDocument();

    userEvent.type(inputSearch, 'gg');

    userEvent.click(execSearchBtn);

    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  it('testa se a pesquisa é feita corretamente', async () => {
    // global.fetch = jest.fn(fetch);
    const { history } = renderWithRouter(<App />);
    // history.push = jest.fn();
    const emailInput = screen.getByRole('textbox');
    const passInput = screen.getByTestId('password-input');
    const btnSubmit = screen.getByRole('button', { name: /enter/i });
    userEvent.type(emailInput, 'vasconaseriaa@gmail.com');
    userEvent.type(passInput, '12345678');
    userEvent.click(btnSubmit);

    const drinkIcon = await screen.findByTestId('drinks-bottom-btn');
    userEvent.click(drinkIcon);

    expect(history.location.pathname).toBe('/drinks');

    const searchBtn = screen.getByRole('img', { name: /search/i });
    userEvent.click(searchBtn);

    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'p');
    expect(inputSearch).toBeInTheDocument();

    const radioBtnFirstLetter = screen.getByTestId(resolveLint);
    userEvent.click(radioBtnFirstLetter);

    const execSearchBtn = screen.getByTestId('exec-search-btn');
    expect(execSearchBtn).toBeInTheDocument();

    userEvent.click(execSearchBtn);

    const resultFirstLetter = await screen.findByRole('img', { name: /paloma/i });
    expect(resultFirstLetter).toBeInTheDocument();
  });
});
