import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../services/henderWithRouter';
import Header from '../components/Header';

describe('Test Header', () => {
  it('Verifica se o Header é renderizado', () => {
    const { history } = renderWithRouter(<Header />);

    const profile = screen.getByTestId('profile-top-btn');
    const search = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    expect(profile).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(profile).toHaveAttribute('alt', 'profile');
    expect(search).toHaveAttribute('alt', 'search');

    userEvent.click(search);
    act(() => {
      history.push('/profile');
    });

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'test');
    userEvent.click(search);
    expect(searchInput).not.toBeInTheDocument();
  });
});
