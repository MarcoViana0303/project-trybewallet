// Coloque aqui suas actions
export const GET_EMAIL = 'GET_EMAIL';
export const START_API = 'START_API';
export const GET_API = 'GET_API';

export const pegarEmail = (payload) => ({ type: GET_EMAIL, payload });

export const startAPI = () => ({ type: START_API });
export const respostaAPI = (payload) => ({ type: GET_API, payload });

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
