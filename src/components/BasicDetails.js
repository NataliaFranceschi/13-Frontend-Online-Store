import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class BasicDetails extends Component {
  render() {
    const { title, price, warranty, freteGratis, addCarrinho, obj } = this.props;
    return (
      <div className="basicDetails">
        <h1 data-testid="product-detail-name">{title}</h1>
        <p className="productPrice" data-testid="product-detail-price">{`R$ ${price}`}</p>
        <p>{warranty}</p>
        {
          freteGratis
        && <p data-testid="free-shipping">Frete Grátis</p>
        }
        <button
          className="button"
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => addCarrinho(obj) }
        >
          Adicionar ao carrinho
        </button>
        <Link to="/">
          <button type="button" className="button">
            Continuar comprando
          </button>
        </Link>
      </div>
    );
  }
}

BasicDetails.propTypes = {
  addCarrinho: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  warranty: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  freteGratis: PropTypes.bool.isRequired,
  obj: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};
