// Coloque aqui suas actions
export const GET_EMAIL = 'GET_EMAIL';
export const START_API = 'START_API';
export const GET_API = 'GET_API';

export const START_EXCHANGE = 'START_EXCHANGE';
export const GET_EXPENSE = 'GET_EXPENSE';
// constantes para actions de inputs e selects
export const GET_ID = 'GET_ID';

// Actions para os inputs e selects
export const getId = (payload) => ({ type: GET_ID, payload });

export const pegarEmail = (payload) => ({ type: GET_EMAIL, payload });
// 1º requisição
export const startAPI = () => ({ type: START_API });
export const respostaAPI = (payload) => ({ type: GET_API, payload });
// 2º requisição
export const exchangeAPI = () => ({ type: START_EXCHANGE });
export const respostaExChange = (payload) => ({ type: GET_EXPENSE, payload });

export const pegarRequisição = () => async (dispatch) => {
  try {
    dispatch(startAPI());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    return dispatch(respostaAPI(result));
  } catch (error) {
    throw new Error(error);
  }
};

export const exchangeRate = (payload) => async (dispatch) => {
  try {
    dispatch(exchangeAPI());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    return dispatch(respostaExChange({
      ...payload, exchangeRates: result,
    }));
  } catch (error) {
    throw new Error(error);
  }
};
