// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { START_API, GET_API } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada

};

export default function infoWallet(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case START_API:
    return state;
  case GET_API:
    return {
      ...state,
      currencies: Object.keys(payload).filter((elemento) => elemento !== 'USDT'),
    };

  default:
    return state;
  }
}
