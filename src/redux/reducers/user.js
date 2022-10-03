import { GET_EMAIL } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {

  email: '', // string que armazena o email da pessoa usuária
};

export default function userInfo(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case GET_EMAIL:
    return { ...state, email: payload };
  default:
    return state;
  }
}
