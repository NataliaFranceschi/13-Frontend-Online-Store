import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getDetails } from '../services/api';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      thumbnail: '',
      price: 0,
      warranty: '',
      id: '',
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const details = await getDetails(id);
    const { title, thumbnail, price, warranty } = details;
    this.setState({
      title,
      thumbnail,
      price,
      warranty,
      id,
    });
  }

  render() {
    const { title, thumbnail, price, warranty, id } = this.state;
    const { addCarrinho } = this.props;
    return (
      <div>
        <ul>
          <li data-testid="product-detail-name">{title}</li>
          <li>
            <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
          </li>
          <li data-testid="product-detail-price">{price}</li>
          <li>{warranty}</li>
        </ul>
        <Link to="/cart" data-testid="shopping-cart-button">
          Ir ao carrinho
        </Link>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => addCarrinho(title, price, id) }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}
ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  addCarrinho: PropTypes.func.isRequired,
};

export default ProductDetails;
