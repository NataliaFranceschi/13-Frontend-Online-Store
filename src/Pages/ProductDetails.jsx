import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getDetails } from '../services/api';
import Header from '../components/Header';
import '../styles/productDetail.scss';
import ProductImage from '../components/ProductImage';
import BasicDetails from '../components/BasicDetails';
import Rating from '../components/Rating';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      thumbnail: '',
      price: 0,
      warranty: '',
      id: '',
      nome: '',
      comentario: '',
      nota: '0',
      arrayAvaliacao: [],
      isNotValid: false,
      freteGratis: false,
      attributes: [],
      quantity: 0,
      pictures: [],
      picture: '',
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const details = await getDetails(id);
    const { title, thumbnail, price, warranty, attributes, available_quantity: quantity,
      shipping: { free_shipping: freteGratis }, pictures } = details;
    this.setState({
      title,
      thumbnail,
      price,
      id,
      freteGratis,
      attributes,
      quantity,
      pictures,
      picture: pictures[0].url,
    });
    if (warranty !== null) {
      this.setState({ warranty });
    }
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
    const { nome, comentario, nota } = this.state;
    if (nota < 1 || nome.length === 0) {
      this.setState({ isNotValid: true });
    } else {
      const obj = {
        nome,
        comentario,
        nota,
      };
      this.setState((prevState) => ({
        arrayAvaliacao: [...prevState.arrayAvaliacao, obj],
      }), this.localStorageSave);
      this.setState({
        nome: '',
        comentario: '',
        nota: '0',
        isNotValid: false,
      });
    }
  }

  localStorageSave = () => {
    const { id, arrayAvaliacao } = this.state;
    localStorage.setItem(id, JSON.stringify(arrayAvaliacao));
  }

  changePicture = ({ target }) => {
    this.setState({ picture: target.src });
  }

  render() {
    const { title, thumbnail, price, warranty, id, attributes, quantity, pictures,
      picture, comentario, nome, arrayAvaliacao,
      isNotValid, freteGratis, nota } = this.state;
    const { addCarrinho, quantidadeProdutos } = this.props;
    const obj = { title, price, id, thumbnail, quantity };
    const filterAtrributes = attributes
      .filter(({ value_name: value }) => (value !== null));
    return (
      <div>
        <Header quantidadeProdutos={ quantidadeProdutos } />
        <section className="productDetails">
          <div className="showProduct">
            <ProductImage
              picture={ picture }
              pictures={ pictures }
              title={ title }
              changePicture={ this.changePicture }
            />
            <BasicDetails
              title={ title }
              warranty={ warranty }
              price={ price }
              freteGratis={ freteGratis }
              addCarrinho={ addCarrinho }
              obj={ obj }
            />
          </div>
          <div className="productInformation">
            <table>
              <tbody>
                {
                  filterAtrributes.map(({ name, value_name: value }, index) => (
                    <tr key={ index }>
                      <td className="name">{name}</td>
                      <td className="value">{value}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <Rating
              comentario={ comentario }
              nome={ nome }
              nota={ nota }
              arrayAvaliacao={ arrayAvaliacao }
              isNotValid={ isNotValid }
              handleChange={ this.handleChange }
              handleClick={ this.handleClick }
            />
          </div>
        </section>
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
