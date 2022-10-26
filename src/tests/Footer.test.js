import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// importar páginas

describe('Testando o compoenente Footer', () => {
  test('1) Se o ícone de meals está presente na página Meals', () => {
    //renderwithrouter
    const nealsButton = screen.getByTestId("meals-bottom-btn");
    expect(nealsButton).toBeInTheDocument();
  });

  test('2) Se o ícone de drinks está presente na página Meals', () => {
    //renderwithrouter
    const drinksButton = screen.getByTestId("drinks-bottom-btn");
    expect(drinksButton).toBeInTheDocument();
  });

  test('3) Se o ícone de meals está presente na página Drinks', () => {
    //renderwithrouter
    const nealsButton = screen.getByTestId("meals-bottom-btn");
    expect(nealsButton).toBeInTheDocument();
  });

  test('4) Se o ícone de drinks está presente na página Drinks', () => {
    //renderwithrouter
    const drinksButton = screen.getByTestId("drinks-bottom-btn");
    expect(drinksButton).toBeInTheDocument();
  });
})