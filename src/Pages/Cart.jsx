import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/cart.scss';

class Cart extends React.Component {
  render() {
    const recoveredObject = JSON.parse(localStorage.getItem('produto'));
    const { removeFromCart, clickToAddOrRemove, quantidadeProdutos } = this.props;
    const carrinhoVazio = (
      <p data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </p>);

    const total = () => recoveredObject
      .reduce((acc, { preço, quantidade }) => acc + (preço * quantidade), 0);
    return (
      <div>
        <Header quantidadeProdutos={ quantidadeProdutos } />
        {
          recoveredObject === null
            ? carrinhoVazio
            : (
              <div className="cart">
                <ul>
                  {recoveredObject
                    .map((
                      { nome, preço, quantidade, id, disponivel, imagem },
                    ) => (
                      <li key={ id } className="cartItem">
                        <img src={ imagem.replace('-I', '-O') } alt={ nome } />
                        <p
                          className="product"
                          data-testid="shopping-cart-product-name"
                        >
                          { nome }

                        </p>
                        <p>{ `R$ ${(preço * quantidade).toFixed(2)}` }</p>
                        <div className="quantity">
                          <button
                            onClick={ () => clickToAddOrRemove(id, 'add',
                              quantidade, disponivel) }
                            type="button"
                            data-testid="product-increase-quantity"
                            className="button"
                          >
                            +
                          </button>
                          <p>{ quantidade }</p>
                          <button
                            onClick={ () => clickToAddOrRemove(id, 'remove', quantidade) }
                            type="button"
                            data-testid="product-decrease-quantity"
                            className="button"
                          >
                            -
                          </button>
                        </div>
                        <button
                          onClick={ () => removeFromCart(id) }
                          type="button"
                          data-testid="remove-product"
                          className="button remove"
                        >
                          REMOVER
                        </button>
                      </li>
                    ))}
                </ul>
                <aside>
                  <Link to="/">
                    <button type="button" className="button">
                      Continuar comprando
                    </button>
                  </Link>
                  <p>{`Subtotal : R$ ${total().toFixed(2)}`}</p>
                  <Link to="/checkout">
                    <button type="button" className="button">
                      Finalizar Compra
                    </button>
                  </Link>
                </aside>
              </div>
            )
        }
      </div>
    );
  }
}
Cart.propTypes = {
  clickToAddOrRemove: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  quantidadeProdutos: PropTypes.number.isRequired,
};

export default Cart;
