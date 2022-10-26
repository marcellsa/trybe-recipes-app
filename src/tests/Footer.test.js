import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { act } from 'react-dom/test-utils';
// import Meals from '../pages/Meals';
// import Drinks from '../pages/Drinks';

// importar páginas

describe('Testando o compoenente Footer', () => {
  test('1) Se o ícone de meals está presente na página Meals', () => {
   
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    })
    const mealsButton = screen.getByTestId('meals-bottom-btn');
    expect(mealsButton).toBeInTheDocument();
  });

  test('2) Se o ícone de drinks está presente na página Meals', () => {
    
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    })
    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinksButton).toBeInTheDocument();
  });

  test('3) Se o ícone de meals está presente na página Drinks', () => {

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    })
    const mealsButton = screen.getByTestId('meals-bottom-btn');
    expect(mealsButton).toBeInTheDocument();
  });

  test('4) Se o ícone de drinks está presente na página Drinks', () => {
    
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    })
    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinksButton).toBeInTheDocument();
  });
})