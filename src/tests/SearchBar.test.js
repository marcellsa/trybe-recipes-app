import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Context from '../context/Context';
import SearchBar from '../components/SearchBar';

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
});
