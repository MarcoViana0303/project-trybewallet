import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

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
  test('Verifique a página de Login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText('email');
    const inputSenha = screen.getByPlaceholderText('senha');
    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });

    const regexEmail1 = /\S+@\S+\.\S+/;
    const emailTest = regexEmail1.test(inputEmail.value);
    expect(emailTest).toBe(false);
    expect(buttonEntrar.type).toBe('button');
    userEvent.type(inputEmail, 'example@example.com');
    userEvent.type(inputSenha, '100Marco');

    expect(buttonEntrar).toBeEnabled();
    expect(inputEmail).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
    expect(inputSenha.value.length).toEqual(8);
    expect(inputEmail.value).toBe('example@example.com');

    userEvent.click(buttonEntrar);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  test('Verifica se a /carteira renderiza os elementos necessários', () => {
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
  test('se os elementos da /carteira funcionam corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/carteira');
    });

    const inputValue = screen.getByPlaceholderText(/valor da despesa/i);
    const description = screen.getByPlaceholderText(/descrição da despesa/i);
    const moeda = screen.getByText('Moeda');
    userEvent.type(inputValue, '5');
    userEvent.type(description, 'bife à parmegiana');

    const metodoPagamento = screen.getByText('Método de pagamento');

    const category = screen.getByText('Tag');

    const adicionarDespesa = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(adicionarDespesa);
    expect(moeda).toBeInTheDocument();
    expect(metodoPagamento).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(inputValue.value).toBe('');
    expect(inputValue.value.length).toEqual(0);
    expect(description.value).toBe('');
  });

  test('Verifique se o select funciona corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/carteira');
    });

    const moeda = screen.getByTestId('currency-input');
    expect(moeda).toBeInTheDocument();

    await waitFor(() => {
      expect(moeda).toHaveValue('USD');
    });

    const methodPay = screen.getByTestId('method-input');
    userEvent.selectOptions(methodPay, 'Cartão de crédito');
    expect(methodPay).toHaveValue('Cartão de crédito');

    userEvent.selectOptions(moeda, 'ETH');
    expect(moeda).toHaveValue('ETH');

    const adicionarDespesa = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(adicionarDespesa);
  });

  // com a ajuda do meu coleguinha Beterraba
  test('se o retorno da api é gerada no clique de adicionar despesas', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
    renderWithRouterAndRedux(<Wallet />);

    const adicionarDespesa2 = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(adicionarDespesa2);

    expect(global.fetch).toHaveBeenCalled();
  });
});
