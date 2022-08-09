import React from 'react';
import PropTypes from 'prop-types';

class Cart extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     shoppingCart: '',
  //   };
  // }

  componentDidMount = () => {
    const xablau = Object.values(localStorage);
    const mapXablau = xablau.map((produto) => JSON.parse(produto));
    console.log((mapXablau));
  }

  // componentDidMount = () => {
  //   const { arrayCarrinho } = this.props;
  //   this.setState({ shoppingCart: arrayCarrinho });
  // }

  // removeFromCart = (id) => {
  //   const { shoppingCart } = this.state;
  //   const { localStorageM } = this.props;
  //   const productRemoved = shoppingCart.filter((products) => products.id !== id);
  //   this.setState({ shoppingCart: productRemoved });
  //   localStorageM(shoppingCart);
  // }

  // clickToAddOrRemove = (id, name, quantidade) => {
  //   const { shoppingCart } = this.state;
  //   const { localStorageM } = this.props;
  //   const newCart = shoppingCart.map((product) => {
  //     if (product.id === id) {
  //       if (quantidade === 1 && name === 'remove') return product;
  //       if (name === 'add') product.quantidade += 1;
  //       if (name === 'remove') product.quantidade -= 1;
  //     }
  //     return product;
  //   });
  //   this.setState({ shoppingCart: newCart });
  //   localStorageM(shoppingCart);
  // }

  render() {
    const xablau = Object.values(localStorage);
    const mapXablau = xablau.map((produto) => JSON.parse(produto));
    console.log((mapXablau));
    const { removeFromCart, clickToAddOrRemove } = this.props;
    const carrinhoVazio = (
      <p data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </p>);
    const produtos = mapXablau.map(({ nome, preço, quantidade, id }) => (
      <li key={ id }>
        <p data-testid="shopping-cart-product-name">{ nome }</p>
        <p>{ preço * quantidade }</p>
        <p data-testid="shopping-cart-product-quantity">{ quantidade }</p>
        <button
          onClick={ () => clickToAddOrRemove(id, 'add') }
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
    return (
      <div>
        {
          produtos.length === 0
            ? carrinhoVazio
            : <ul>{produtos}</ul>
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
