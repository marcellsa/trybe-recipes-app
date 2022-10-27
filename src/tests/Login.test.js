import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';

describe('Testa a página de Login', () => {
  test('Testa se existe um input de email na tela', () => {
    render(<Login />);
    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.type).toBe('email');
  });

  test('Testa se existe um input de password na tela', () => {
    render(<Login />);
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput.type).toBe('password');
  });

  test('Testa se existe um botão na tela', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /enter/i });
    expect(submitButton).toBeInTheDocument();
  });

  test('Testa se, após clicar no botão, o usuário é redirecionado para a página /meals', () => {
    const { history } = renderWithRouter(<Login />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByRole('button', { name: /enter/i });

    userEvent.type(emailInput, 'vasco@gmail.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(submitButton);

    expect(history.location.pathname).toBe('/meals');
  });
});
