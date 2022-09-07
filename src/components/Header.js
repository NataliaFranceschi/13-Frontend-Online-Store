import React, { Component } from 'react';
import '../styles/header.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaShoppingCart } from 'react-icons/fa';
import OS from '../os.png';

class Header extends Component {
  render() {
    const { quantidadeProdutos } = this.props;
    return (
      <div className="header">
        <img src={ OS } alt="logo" />
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
