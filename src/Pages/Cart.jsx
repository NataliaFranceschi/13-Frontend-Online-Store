import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
  render() {
    const recoveredObject = JSON.parse(localStorage.getItem('produto'));
    const { removeFromCart, clickToAddOrRemove } = this.props;
    const carrinhoVazio = (
      <p data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </p>);
    const produtos = () => {
      if (recoveredObject !== null) {
        return recoveredObject.map(({ nome, preço, quantidade, id, disponivel }) => (
          <li key={ id }>
            <p data-testid="shopping-cart-product-name">{ nome }</p>
            <p>{ preço * quantidade }</p>
            <p data-testid="shopping-cart-product-quantity">{ quantidade }</p>
            <button
              onClick={ () => clickToAddOrRemove(id, 'add', quantidade, disponivel) }
              type="button"
              data-testid="product-increase-quantity"
            >
              +
            </button>
            <button
              onClick={ () => clickToAddOrRemove(id, 'remove', quantidade) }
              type="button"
              data-testid="product-decrease-quantity"
            >
              -
            </button>
            <button
              onClick={ () => removeFromCart(id) }
              type="button"
              data-testid="remove-product"
            >
              REMOVER
            </button>
          </li>));
      }
    };
    return (
      <div>
        <Link to="/checkout" data-testid="checkout-products">
          Finalizar Compra
        </Link>
        {
          recoveredObject === null
            ? carrinhoVazio
            : <ul>{produtos()}</ul>
        }
      </div>
    );
  }
}
Cart.propTypes = {
  clickToAddOrRemove: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default Cart;
