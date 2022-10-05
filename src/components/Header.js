import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  soma = () => {
    const { expenses } = this.props;
    let valorConvertido = 0;
    expenses.forEach(({ value, currency, exchangeRates }) => {
      valorConvertido += value * exchangeRates[currency].ask;
    });
    return valorConvertido.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <section data-testid="email-field">
          {email}
        </section>
        <div data-testid="total-field">
          { this.soma() }
        </div>

        <div data-testid="header-currency-field">

          BRL

        </div>

      </div>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.objectOf().isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps)(Header);
