import React from 'react';
import PropTypes from 'prop-types';

class Cart extends React.Component {
  render() {
    const { arrayCarrinho } = this.props;
    const carrinhoVazio = (
      <p data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </p>);
    return (
      <div>
        {
          arrayCarrinho.length === 0
            ? carrinhoVazio
            : null
        }
      </div>
    );
  }
}
Cart.propTypes = {
  arrayCarrinho: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default Cart;
