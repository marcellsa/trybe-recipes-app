import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from './renderWithRouter';

const DONE_RECIPES_KEY_MOCK_TEST = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('Testing DoneRecipes page', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('doneRecipes', JSON.stringify(DONE_RECIPES_KEY_MOCK_TEST));
  });

  test('Verifica se os botões de categorias existem ', () => {
    renderWithRouter(<DoneRecipes />);

    const allFilterButton = screen.getByTestId('filter-by-all-btn');
    const mealFilterButton = screen.getByTestId('filter-by-meal-btn');
    const drinkFilterButton = screen.getByTestId('filter-by-drink-btn');

    expect(allFilterButton && drinkFilterButton && mealFilterButton).toBeInTheDocument();
  });

  test('Verifica se existem 2 receitas aparecendo na tela', async () => {
    renderWithRouter(<DoneRecipes />);
    const firstRecipe = await screen.findByText(/spicy arrabiata penne/i);
    const secondRecipe = await screen.findByText(/aquamarine/i);
    expect(firstRecipe && secondRecipe).toBeInTheDocument();
  });
});
