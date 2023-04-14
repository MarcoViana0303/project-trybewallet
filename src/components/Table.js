import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table className='table-wallet'>
          <thead>

            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Tag</th>
              <th scope="col">Método de pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((el) => (
              <tr key={ el.id }>
                <td>{el.description}</td>
                <td>{el.tag}</td>
                <td>{el.method}</td>
                <td>{Number(el.value).toFixed(2)}</td>
                <td>{el.currency}</td>
                <td>{el.exchangeRates[el.currency].name}</td>
                <td>{Number(el.exchangeRates[el.currency].ask).toFixed(2)}</td>
                <td>{Number(el.exchangeRates[el.currency].ask * el.value).toFixed(2)}</td>
                <td>Real</td>
              </tr>
            ))}
            {/* <button data-testid="delete-btn" type="button">Deletar despesas</button> */}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
