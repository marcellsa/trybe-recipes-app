import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';

const SEARCH = 'search-top-btn';
const INPUT = 'search-input';
const PROFILE = 'profile-top-btn';

describe('Test Header', () => {
  it('Verifica se o botão do profile redireciona para /profile', () => {
    const { history } = renderWithRouter(<Meals />);
    const profile = screen.getByTestId(PROFILE);
    userEvent.click(profile);
    expect(history.location.pathname).toBe('/profile');
  });

  it('Verifica se o Header é renderizado no Meals', async () => {
    renderWithRouter(<Meals />);
    const search = await screen.findByTestId(SEARCH);
    expect(search).toBeInTheDocument();
    userEvent.click(search);
    const searchInput = await screen.findByTestId(INPUT);
    expect(searchInput).toBeInTheDocument();
    userEvent.click(search);
  });

  it('Verifica se o Header é renderizado no Drinks', async () => {
    renderWithRouter(<Drinks />);
    const search = await screen.findByTestId(SEARCH);
    expect(search).toBeInTheDocument();
    userEvent.click(search);
    const searchInput = await screen.findByTestId(INPUT);
    expect(searchInput).toBeInTheDocument();
    userEvent.click(search);
  });
});
