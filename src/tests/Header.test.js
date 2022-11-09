import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from './renderWithRouter';
import Context from '../context/Context';

describe('Verifica o componente Header', () => {
  const INITIAL_STATE = {
    inputSearch: '',
    setInputSearch: () => {},
    setResultFilterMeals: () => {},
    setResultFilterDrinks: () => {},
  };

  it('Verifica se os botões e o input estão na tela ao renderizar a página Meals', () => {
    const title = 'Meals';
    renderWithRouter(
      <Context.Provider value={ INITIAL_STATE }>
        <Header>
          {title}
        </Header>
      </Context.Provider>,
    );

    const titleTest = screen.getByTestId('page-title');
    expect(titleTest).toBeInTheDocument();

    const btnProfile = screen.getByTestId('profile-top-btn');

    expect(btnProfile).toBeInTheDocument();

    const btnSearch = screen.getByTestId('search-top-btn');
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(btnSearch);

    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'soup');
  });

  it('Verifica se, ao clicar no botão de perfil, o usuario é encaminhado para a página de perfil', () => {
    const title = 'Drinks';
    const { history } = renderWithRouter(
      <Context.Provider value={ INITIAL_STATE }>
        <Header>
          {title}
        </Header>
      </Context.Provider>,
    );

    const btnProfile = screen.getByTestId('profile-top-btn');

    userEvent.click(btnProfile);
    expect(history.location.pathname).toBe('/profile');
  });

  it('Verifica se, a barra de pesquisa aparece ao clicar no botão de pesquisa', () => {
    const title = 'Meals';
    renderWithRouter(
      <Context.Provider value={ INITIAL_STATE }>
        <Header>
          {title}
        </Header>
      </Context.Provider>,
    );

    const btnSearch = screen.getByRole('img', { name: /search/i });

    userEvent.click(btnSearch);

    const inputSearch = screen.getByRole('textbox');

    expect(inputSearch).toBeInTheDocument();

    userEvent.click(btnSearch);
  });
});
