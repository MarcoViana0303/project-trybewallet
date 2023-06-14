import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { pegarEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isBtnDisabled: true,
      email: '',
      senha: '',
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => { this.handleButton(); });
  };

  handleButton = () => {
    const { email, senha } = this.state;
    const minimoSenha = 6;
    const regex = /\S+@\S+\.\S+/;
    const verificarEmail = email && regex.test(email);
    const verificarSenha = senha.length >= minimoSenha;
    this.setState({
      isBtnDisabled: !(verificarEmail && verificarSenha),
    });
  };

  redirectPage = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(pegarEmail(email));
    history.push('/carteira');
  };

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <div>
        <form className="form-login">
          <input
            type="text"
            placeholder="email"
            name="email"
            data-testid="email-input"
            onChange={ this.handleInput }
          />
          <input
            type="password"
            placeholder="senha"
            name="senha"
            data-testid="password-input"
            onChange={ this.handleInput }
          />
          <button
            type="button"
            disabled={ isBtnDisabled }
            onClick={ this.redirectPage }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({}),
  push: PropTypes.shape({}),
  dispatch: PropTypes.shape({}),

}.isRequired;

export default connect()(Login);
