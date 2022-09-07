import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

export default class Rating extends Component {
  render() {
    const { handleChange, nota, nome, comentario, handleClick,
      arrayAvaliacao, isNotValid } = this.props;
    return (
      <div className="productRating">
        <form>
          <StarRating handleChange={ handleChange } nota={ nota } />
          <input
            type="text"
            placeholder="Nome"
            className="input is-warning"
            id="product-detail-name"
            data-testid="product-detail-name"
            name="nome"
            onChange={ handleChange }
            value={ nome }
          />
          <textarea
            data-testid="product-detail-evaluation"
            placeholder="Comentário"
            className="textarea is-warning"
            name="comentario"
            onChange={ handleChange }
            value={ comentario }
          />
          <button
            className="button is-small"
            type="button"
            data-testid="submit-review-btn"
            onClick={ handleClick }
          >
            ENVIAR

          </button>
          { isNotValid && <span data-testid="error-msg"> Campos inválidos</span>}
        </form>
        {
          arrayAvaliacao.map((avaliacao, index) => (
            <div className="avaliacao" key={ index }>
              {Array.from({ length: avaliacao.nota })
                .map((_, i) => (<FaStar key={ `rating-${i}` } color="#E9BE00" />))}
              <p data-testid="review-card-email">{avaliacao.nome}</p>
              <p data-testid="review-card-evaluation">{avaliacao.comentario}</p>
            </div>
          ))
        }
      </div>
    );
  }
}

Rating.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  nome: PropTypes.string.isRequired,
  comentario: PropTypes.string.isRequired,
  arrayAvaliacao: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  isNotValid: PropTypes.bool.isRequired,
  nota: PropTypes.string.isRequired,
};
