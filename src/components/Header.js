import React, { Component } from 'react';
import '../styles/header.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaShoppingCart } from 'react-icons/fa';

class Header extends Component {
  render() {
    const { quantidadeProdutos } = this.props;
    return (
      <div className="header">
        <div>
          <span className="online">O</span>
          <span className="store">S</span>
        </div>

        <Link
          data-testid="shopping-cart-button"
          to="/cart"
        >
          <FaShoppingCart />
          <span data-testid="shopping-cart-size">
            { quantidadeProdutos }
          </span>
        </Link>
      </div>
    );
  }
}

Header.propTypes = {
  quantidadeProdutos: PropTypes.number.isRequired,
};

export default Header;
