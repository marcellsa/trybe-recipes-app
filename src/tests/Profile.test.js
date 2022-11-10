import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Profile from '../pages/Profile';
import renderWithRouter from './renderWithRouter';

describe('testa a página do Profile', () => {
  it('Verifica se os elementos renderizados no Profile', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnenter = screen.getByRole('button', { name: /enter/i });
    expect(email && password && btnenter).toBeInTheDocument();

    userEvent.type(email, 'test@test.com');
    userEvent.type(password, '1234567');
    userEvent.click(btnenter);
    const btnProfile = screen.getByRole('link', {
      name: /profile/i,
    });
    expect(btnProfile).toBeInTheDocument();
    userEvent.click(btnProfile);
    const title = screen.getByTestId('page-title');
    const emailProfile = screen.getByTestId('profile-email');
    const btnOne = screen.getByTestId('profile-done-btn');
    const btnTwo = screen.getByTestId('profile-favorite-btn');
    const btnLogout = screen.getByTestId('profile-logout-btn');
    expect(title && emailProfile && btnOne && btnTwo && btnLogout).toBeInTheDocument();
  });

  it('Verifica as  funcinalidades', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnenter = screen.getByRole('button', { name: /enter/i });
    expect(email && password && btnenter).toBeInTheDocument();

    userEvent.type(email, 'test@test.com');
    userEvent.type(password, '1234567');
    userEvent.click(btnenter);

    const btnProfile = screen.getByRole('link', {
      name: /profile/i,
    });
    expect(btnProfile).toBeInTheDocument();
    setTimeout(() => {
      expect(pathname).toBe('/profile');
    }, 3000);
  });

  it('Verificando botão de DoneRecipes', () => {
    const { history } = renderWithRouter(<Profile />);
    const { location: { pathname } } = history;

    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    userEvent.click(btnDoneRecipes);

    setTimeout(() => {
      expect(pathname).toBe('/done-recipes');
    }, 3000);
  });

  it('Verificando botão de DoneRecipes', () => {
    const { history } = renderWithRouter(<Profile />);
    const { location: { pathname } } = history;

    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    userEvent.click(btnFavorite);

    setTimeout(() => {
      expect(pathname).toBe('/favorite-recipes');
    }, 3000);
  });

  it('Verificando botão de Logout', () => {
    const { history } = renderWithRouter(<Profile />);
    const { location: { pathname } } = history;

    const btnLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(btnLogout);

    setTimeout(() => {
      expect(pathname).toBe('/');
    }, 3000);
  });
});
