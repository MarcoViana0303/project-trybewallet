import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    valorReal: 0,
  };

  render() {
    const { email } = this.props;
    const { valorReal } = this.state;
    return (
      <div>
        <section data-testid="email-field">
          {email}
        </section>
        <div data-testid="total-field">
          { valorReal}
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
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});
export default connect(mapStateToProps)(Header);
