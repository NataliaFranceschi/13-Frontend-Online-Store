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
    });
  }

  render() {
    const { title, thumbnail, price, warranty } = this.state;
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
          Comprar
        </Link>
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
};

export default ProductDetails;
