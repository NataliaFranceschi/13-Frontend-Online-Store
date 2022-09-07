import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';
import '../styles/starRating.scss';
import PropTypes from 'prop-types';

class StarRating extends Component {
  render() {
    const { nota, handleChange } = this.props;
    const STAR_NUMBER = 5;
    return (
      <div className="rating">
        { Array.from({ length: STAR_NUMBER }).map((_, index) => {
          const ratingValue = STAR_NUMBER - index;
          return (
            <label className="yellow" key={ index } htmlFor={ ratingValue }>
              <input
                className="star"
                data-testid={ `${ratingValue}-rating` }
                type="radio"
                name="nota"
                id={ ratingValue }
                onChange={ handleChange }
                value={ ratingValue }
              />
              <FaStar color={ ratingValue <= nota ? '#E9BE00' : null } />
            </label>
          );
        })}

      </div>
    );
  }
}

StarRating.propTypes = {
  handleChange: PropTypes.func.isRequired,
  nota: PropTypes.string.isRequired,
};

export default StarRating;
