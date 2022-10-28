import React from 'react';
import { screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// import App from '../App';
import renderWithRouter from './renderWithRouter';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';

describe('Testando o compoenente Footer', () => {
  test('1) Se o ícone de meals está presente na página Meals', () => {
    renderWithRouter(<Meals />);
    const mealsButton = screen.getByTestId('meals-bottom-btn');
    expect(mealsButton).toBeInTheDocument();
  });

  test('2) Se o ícone de drinks está presente na página Meals', () => {
    renderWithRouter(<Meals />);
    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinksButton).toBeInTheDocument();
  });

  test('3) Se o ícone de meals está presente na página Drinks', () => {
    renderWithRouter(<Drinks />);
    const mealsButton = screen.getByTestId('meals-bottom-btn');
    expect(mealsButton).toBeInTheDocument();
  });

  test('4) Se o ícone de drinks está presente na página Drinks', () => {
    renderWithRouter(<Drinks />);
    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinksButton).toBeInTheDocument();
  });
});
