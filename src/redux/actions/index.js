// Coloque aqui suas actions

export const GET_EMAIL = 'GET_EMAIL';
const GET_PASSWORD = 'GET_PASSWORD';
export const pegarEmail = (payload) => ({ type: GET_EMAIL, payload });

export const pegarSenha = () => ({ type: GET_PASSWORD });
