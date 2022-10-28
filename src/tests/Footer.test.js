import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';

const MEALS_BUTTON_ID = 'meals-bottom-btn';
const DRINKS_BUTTON_ID = 'drinks-bottom-btn';

describe('Testando o compoenente Footer', () => {
  test('1) Se o ícone de meals está presente na página Meals', () => {
    renderWithRouter(<Meals />);
    const mealsButton = screen.getByTestId(MEALS_BUTTON_ID);
    expect(mealsButton).toBeInTheDocument();
  });

  test('2) Se o ícone de drinks está presente na página Meals', () => {
    renderWithRouter(<Meals />);
    const drinksButton = screen.getByTestId(DRINKS_BUTTON_ID);
    expect(drinksButton).toBeInTheDocument();
  });

  test('3) Se o ícone de meals está presente na página Drinks', () => {
    renderWithRouter(<Drinks />);
    const mealsButton = screen.getByTestId(MEALS_BUTTON_ID);
    expect(mealsButton).toBeInTheDocument();
  });

  test('4) Se o ícone de drinks está presente na página Drinks', () => {
    renderWithRouter(<Drinks />);
    const drinksButton = screen.getByTestId(DRINKS_BUTTON_ID);
    expect(drinksButton).toBeInTheDocument();
  });

  test('5) Se ao clicar no ícone de DRINKS é redirecionado para lista de comidas', () => {
    const { history } = renderWithRouter(<Meals />);
    const drinksButton = screen.getByTestId(DRINKS_BUTTON_ID);
    userEvent.click(drinksButton);
    expect(history.location.pathname).toBe('/drinks');
  });

  test('6) Se ao clicar no ícone de MEALS é redirecionado para lista de comidas', () => {
    const { history } = renderWithRouter(<Drinks />);
    const mealsButton = screen.getByTestId(MEALS_BUTTON_ID);
    userEvent.click(mealsButton);
    expect(history.location.pathname).toBe('/meals');
  });
});
