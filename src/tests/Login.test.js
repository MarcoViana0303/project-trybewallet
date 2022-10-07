import React from 'react';
import { screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Verifique se a página inicial funciona corretamete', () => {
  test('Verifique se os elementos estão na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const inputEmail = screen.getByPlaceholderText('email');
    const inputSenha = screen.getByPlaceholderText('senha');
    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });
    expect(inputEmail).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
    expect(buttonEntrar).toBeInTheDocument();
  });

  test('Verifica se a /carteira tudo funciona corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/carteira');
    });
    const rota = history.location.pathname;
    expect(rota).toBe('/carteira');

    const inputValue = screen.getByPlaceholderText(/valor da despesa/i);
    const description = screen.getByPlaceholderText(/descrição da despesa/i);

    const emailGravado = screen.getByTestId('email-field');
    const valorTotal = screen.getByTestId('total-field');
    const moeda = screen.getByText(/brl/i);

    expect(inputValue).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(emailGravado).toBeInTheDocument();
    expect(valorTotal).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
  });
});
