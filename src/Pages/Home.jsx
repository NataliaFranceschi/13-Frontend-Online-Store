import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Header from '../components/Header';
import '../styles/home.scss';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      campoDeBusca: '',
      arrayCategorias: [],
      arrayProdutos: [],
    };
  }

componentDidMount = async () => {
  const categoria = await getCategories();
  this.setState({ arrayCategorias: categoria });
}

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { campoDeBusca } = this.state;
    const termos = await getProductsFromCategoryAndQuery('', campoDeBusca);
    this.setState({ arrayProdutos: termos.results });
  }

  handleClickButton = async ({ target }) => {
    if (target.value !== '') {
      const termos = await getProductsFromCategoryAndQuery(target.value, '');
      this.setState({ arrayProdutos: termos.results });
    }
  }

  render() {
    const { addCarrinho, quantidadeProdutos } = this.props;
    const { campoDeBusca, arrayCategorias, arrayProdutos } = this.state;
    return (
      <div>
        <Header quantidadeProdutos={ quantidadeProdutos } />
        <div className="home">
          <div className="category">
            { arrayCategorias.map(({ name, id }) => (
              <button
                key={ name }
                type="button"
                value={ id }
                data-testid="category"
                onClick={ this.handleClickButton }
              >
                {name}
              </button>)) }
          </div>
          <div className="categoryPhone">
            <select
              onChange={ this.handleClickButton }
            >
              <option value="">Categorias</option>
              { arrayCategorias.map(({ name, id }) => (
                <option
                  key={ name }
                  value={ id }
                >
                  {name}
                </option>)) }
            </select>
          </div>
          <div className="search">
            <div className="inputSearch">
              <input
                type="text"
                id="input"
                value={ campoDeBusca }
                name="campoDeBusca"
                onChange={ this.handleChange }
                data-testid="query-input"
                className="input is-warning"
              />

              <button
                type="button"
                data-testid="query-button"
                onClick={ this.handleClick }
                className="button is-warning"
              >
                Pesquisar

              </button>
            </div>
            <ul className="products">
              {arrayProdutos.length !== 0
                && arrayProdutos
                  .map(({ title, price, thumbnail, id, available_quantity: quantity,
                    shipping: { free_shipping: freteGratis },
                  }) => {
                    const obj = { title, price, id, quantity, thumbnail };
                    return (
                      <li className="product" data-testid="product" key={ id }>
                        <img src={ thumbnail.replace('-I', '-O') } alt={ title } />
                        <Link
                          to={ `/productDetails/${id}` }
                          data-testid="product-detail-link"
                        >
                          <p>{title}</p>
                        </Link>
                        <p className="productPrice">
                          R$
                          {price}
                        </p>
                        {
                          freteGratis
                          && <span data-testid="free-shipping">Frete Grátis</span>
                        }
                        <button
                          type="button"
                          data-testid="product-add-to-cart"
                          onClick={ () => addCarrinho(obj) }
                          className="button is-warning"
                        >
                          Adicionar ao carrinho

                        </button>
                      </li>
                    );
                  })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  addCarrinho: PropTypes.func.isRequired,
  quantidadeProdutos: PropTypes.number.isRequired,
};

export default Home;
