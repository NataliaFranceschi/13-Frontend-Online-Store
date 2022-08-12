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
      email: '',
      comentario: '',
      nota: 0,
      arrayAvaliacao: [],
      isNotValid: false,
      freteGratis: false,
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const details = await getDetails(id);
    const { title, thumbnail, price, warranty,
      shipping: { free_shipping: freteGratis } } = details;
    this.setState({
      title,
      thumbnail,
      price,
      warranty,
      id,
      freteGratis,
    });
    const recoveredObject = JSON.parse(localStorage.getItem(id));
    if (recoveredObject !== null) {
      this.setState({ arrayAvaliacao: recoveredObject });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { email, comentario, nota } = this.state;
    const padraoEmail = /\S+@\S+\.\S+/;
    if (nota < 1 || !padraoEmail.test(email)) {
      this.setState({ isNotValid: true });
    } else {
      const obj = {
        email,
        comentario,
        nota,
      };
      this.setState((prevState) => ({
        arrayAvaliacao: [...prevState.arrayAvaliacao, obj],
      }), this.localStorageSave);
      this.setState({
        email: '',
        comentario: '',
        isNotValid: false,
      });
    }
  }

  localStorageSave = () => {
    const { id, arrayAvaliacao } = this.state;
    localStorage.setItem(id, JSON.stringify(arrayAvaliacao));
  }

  render() {
    const { title, thumbnail, price, warranty, id,
      comentario, email, arrayAvaliacao, isNotValid, freteGratis } = this.state;
    const { addCarrinho, quantidadeProdutos } = this.props;
    return (
      <div>
        <div>
          <ul>
            <li data-testid="product-detail-name">{title}</li>
            <li>
              <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
            </li>
            <li data-testid="product-detail-price">{price}</li>
            <li>{warranty}</li>
            {
              freteGratis
              && <span data-testid="free-shipping">Frete Grátis</span>
            }
          </ul>
          <Link to="/cart" data-testid="shopping-cart-button">
            Ir ao carrinho
            <span data-testid="shopping-cart-size">
              { quantidadeProdutos }
            </span>
          </Link>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => addCarrinho(title, price, id) }
          >
            Adicionar ao carrinho
          </button>
        </div>
        <form>
          <div>
            <label htmlFor="product-detail-email">
              <input
                type="email"
                id="product-detail-email"
                data-testid="product-detail-email"
                name="email"
                onChange={ this.handleChange }
                value={ email }
              />
            </label>
          </div>
          <div>
            { Array.from({ length: 5 }).map((_, index) => (
              <label key={ index } htmlFor={ `${index + 1}-rating` }>
                {index + 1}
                <input
                  data-testid={ `${index + 1}-rating` }
                  id={ `${index + 1}-rating` }
                  type="radio"
                  name="nota"
                  onClick={ this.handleChange }
                  value={ index + 1 }
                />
              </label>
            ))}
          </div>
          <div>
            <label htmlFor="product-detail-evaluation">
              <textarea
                data-testid="product-detail-evaluation"
                name="comentario"
                onChange={ this.handleChange }
                value={ comentario }
              />
            </label>
          </div>
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.handleClick }
          >
            ENVIAR

          </button>
          { isNotValid && <span data-testid="error-msg"> Campos inválidos</span>}
        </form>
        <div>
          {
            arrayAvaliacao.map((avaliacao, index) => (
              <div key={ index }>
                <p data-testid="review-card-email">{avaliacao.email}</p>
                <p data-testid="review-card-rating">{`nota:${avaliacao.nota}`}</p>
                <p data-testid="review-card-evaluation">{avaliacao.comentario}</p>
              </div>
            ))
          }
        </div>
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
  quantidadeProdutos: PropTypes.number.isRequired,
};

export default ProductDetails;
