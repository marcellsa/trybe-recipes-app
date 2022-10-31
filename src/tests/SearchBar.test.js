import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
// import Meals from '../pages/Meals';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente SearchBar', () => {
  test('Testa se existe 3 radios buttons na tela', () => {
    renderWithRouter(<SearchBar />);
    // const search = screen.getByTestId('search-top-btn');
    // expect(search).toBeInTheDocument();
    // userEvent.click(search);
    const ingredients = screen.getByTestId('ingredient-search-radio');
    expect(ingredients).toBeInTheDocument();
  });
});
