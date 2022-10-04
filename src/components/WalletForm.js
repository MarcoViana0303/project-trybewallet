import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { pegarRequisição } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(pegarRequisição());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <input type="text" data-testid="value-input" placeholder="Valor da despesa" />
          <input
            type="text"
            data-testid="description-input"
            placeholder="Descrição da despesa"
          />

          <select data-testid="currency-input">
            {currencies.map((elemento) => (
              <option key={ elemento }>{ elemento }</option>
            ))}
          </select>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>

        </form>

      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.objectOf().isRequired,
  dispatch: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
