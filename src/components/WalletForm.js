import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { pegarRequisição, exchangeRate } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(pegarRequisição());
  }

  saveInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  buttonAdd = () => {
    const { dispatch, expenses } = this.props;
    dispatch(exchangeRate(
      { ...this.state, id: expenses.length },
    ));

    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            name="value"
            data-testid="value-input"
            value={ value }
            placeholder="Valor da despesa"
            onChange={ this.saveInput }
          />
          <input
            value={ description }
            name="description"
            type="text"
            data-testid="description-input"
            placeholder="Descrição da despesa"
            onChange={ this.saveInput }
          />

          <select
            value={ currency }
            name="currency"
            data-testid="currency-input"
            onChange={ this.saveInput }
          >
            {currencies.map((elemento) => (
              <option key={ elemento }>{ elemento }</option>
            ))}
          </select>
          <select
            value={ method }
            name="method"
            data-testid="method-input"
            onChange={ this.saveInput }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            value={ tag }
            name="tag"
            data-testid="tag-input"
            onChange={ this.saveInput }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>

          <button type="button" onClick={ this.buttonAdd }>
            Adicionar despesa
          </button>
        </form>

      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape.isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
