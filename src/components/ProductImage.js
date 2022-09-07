import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductImage extends Component {
  render() {
    const { pictures, picture, title, changePicture } = this.props;
    return (
      <div className="pictureDetail">
        <img className="exibition" src={ picture } alt={ title } />
        <div>
          {
            pictures.map(({ url }, index) => (
              <img
                key={ index }
                src={ url }
                alt={ title }
                onClick={ changePicture }
                role="presentation"
              />
            ))
          }
        </div>
      </div>
    );
  }
}

ProductImage.propTypes = {
  changePicture: PropTypes.func.isRequired,
  picture: PropTypes.string.isRequired,
  pictures: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  title: PropTypes.string.isRequired,
};
