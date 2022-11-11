import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouter from './renderWithRouter';
import DetailsMeals from '../pages/DetailsMeals';
import localStorageMock from '../services/LocalStorageMock';

// const favoriteRecipes = [
//   {
//     id: '52771',
//     type: 'meal',
//     nationality: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//   },
//   {
//     id: '178319',
//     type: 'drink',
//     nationality: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Aquamarine',
//     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//   },
// ];

// const setLocalStorage = (id, data) => {
//   window.localStorage.setItem(id, JSON.stringify(data));
// };

describe('Verifica se na página de Favoritos', () => {
  beforeEach(() => {
    window.localStorage.clear();
    // localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });

  it('Verifica se os botões de categorias existem ', () => {
    renderWithRouter(<FavoriteRecipes />);
    const btnAll = screen.getByTestId('filter-by-all-btn');
    const btnMeal = screen.getByTestId('filter-by-meal-btn');
    const btnDrink = screen.getByTestId('filter-by-drink-btn');
    expect(btnAll && btnDrink && btnMeal).toBeInTheDocument();
  });

  it('Se o botão de remover não aparece na página', () => {
    renderWithRouter(<FavoriteRecipes />);
    const removeButton = screen.queryByTestId('favorite-btn');
    expect(removeButton).not.toBeInTheDocument();
  });

  it('Verifica se existem 2 itens aparecendo na tela', async () => {
    global.localStorage = localStorageMock();
    localStorage.setItem('favoriteRecipes', JSON.stringify());

    const { history } = renderWithRouter(<DetailsMeals />);
    act(() => {
      history.push('/meals/52977');
    });
    expect(history.location.pathname).toBe('/meals/52977');

    const heart = screen.getByRole('img', {
      name: /favorite/i,
    });
    userEvent.click(heart);

    act(() => {
      history.push('/favorite-recipes');
    });
    expect(history.location.pathname).toBe('/favorite-recipes');
    const imgCorba = await screen.findByTestId('0-horizontal-image');
    expect(imgCorba).toBeInTheDocument();
  });

  // it('Verifica se os botões de categoria funcionam', async () => {
  //   renderWithRouter(<FavoriteRecipes />);
  //   const firstItem = await screen.findByText(/spicy arrabiata penne/i);
  //   const secondItem = await screen.findByText(/aquamarine/i);
  //   const btnAll = screen.getByTestId('filter-by-all-btn');
  //   const btnMeal = screen.getByTestId('filter-by-meal-btn');
  //   const btnDrink = screen.getByTestId('filter-by-drink-btn');
  //   expect(btnAll && btnMeal && btnDrink && firstItem && secondItem).toBeInTheDocument();
  //   userEvent.click(btnMeal);
  //   expect(secondItem).not.toBeInTheDocument();
  //   userEvent.click(btnDrink);
  //   expect(firstItem).not.toBeInTheDocument();
  //   userEvent.click(btnDrink);
  // });

  // it('Verifica se os botões do item funcionam', async () => {
  //   window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

  //   renderWithRouter(<FavoriteRecipes />);
  //   const btnShare = await screen.findByTestId('0-horizontal-share-btn');
  //   expect(btnShare).toBeInTheDocument();
  // });
});
