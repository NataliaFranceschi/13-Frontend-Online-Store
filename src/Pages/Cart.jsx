import React from 'react';
import PropTypes from 'prop-types';

class Cart extends React.Component {
  render() {
    const { arrayCarrinho } = this.props;
    const carrinhoVazio = (
      <p data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </p>);
    const produtos = arrayCarrinho.map(({ nome, preço, quantidade, id }) => (
      <li key={ id }>
        <p data-testid="shopping-cart-product-name">{ nome }</p>
        <p>{ preço * quantidade }</p>
        <p data-testid="shopping-cart-product-quantity">{ quantidade }</p>
        <button
          onClick={ () => this.clickToAddOrRemove(id, 'add') }
          type="button"
          data-testid="product-increase-quantity"
        >
          +
        </button>
        <button
          onClick={ () => this.clickToAddOrRemove(id, 'remove', quantidade) }
          type="button"
          data-testid="product-decrease-quantity"
        >
          -
        </button>
        <button
          onClick={ () => this.removeFromCart(id) }
          type="button"
          data-testid="remove-product"
        >
          REMOVER
        </button>
      </li>));
    return (
      <div>
        {
          arrayCarrinho.length === 0
            ? carrinhoVazio
            : <ul>{produtos}</ul>
        }
      </div>
    );
  }
}
Cart.propTypes = {
  arrayCarrinho: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default Cart;
