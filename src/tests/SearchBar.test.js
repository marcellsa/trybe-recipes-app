import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Context from '../context/Context';
import SearchBar from '../components/SearchBar';
import App from '../App';

describe('Testa o componente SearchBar', () => {
  const INITIAL_STATE = {
    inputSearch: '',
    setResultFilterDrinks: () => {},
    setResultFilterMeals: () => {},
  };

  it('Verifica se existem 3 radio buttons e 1 button no searchBar', () => {
    renderWithRouter(
      <Context.Provider value={ INITIAL_STATE }>
        <SearchBar />
      </Context.Provider>,
    );

    const radioBtnIngredients = screen.getByTestId('ingredient-search-radio');
    const radioBtnName = screen.getByTestId('name-search-radio');
    const radioBtnFirstLetter = screen.getByTestId('first-letter-search-radio');

    expect(radioBtnFirstLetter).toBeInTheDocument();
    expect(radioBtnName).toBeInTheDocument();
    expect(radioBtnIngredients).toBeInTheDocument();
  });

  it('testa se a pesquisa é feita corretamente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push = jest.fn();
    const emailInput = screen.getByRole('textbox');
    const passInput = screen.getByTestId('password-input');
    const btnSubmit = screen.getByRole('button', { name: /enter/i });
    userEvent.type(emailInput, 'vasconaseriaa@gmail.com');
    userEvent.type(passInput, '12345678');
    userEvent.click(btnSubmit);

    const searchBtn = screen.getByRole('img', { name: /search/i });
    userEvent.click(searchBtn);

    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'potato');
    expect(inputSearch).toBeInTheDocument();

    const radioBtnIngredients = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radioBtnIngredients);

    const execSearchBtn = screen.getByTestId('exec-search-btn');
    expect(execSearchBtn).toBeInTheDocument();

    userEvent.click(execSearchBtn);

    await waitFor(() => {
      expect(history.push).toHaveBeenCalledWith('/meals/52782');
      expect(history.push).toHaveBeenCalledTimes(1);
    });
  });
});
