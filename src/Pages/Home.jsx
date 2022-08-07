import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

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
    const termos = await getProductsFromCategoryAndQuery(target.value, '');
    this.setState({ arrayProdutos: termos.results });
  }

  render() {
    const { campoDeBusca, arrayCategorias, arrayProdutos } = this.state;
    return (
      <div>
        <label htmlFor="input">
          <input
            type="text"
            id="input"
            value={ campoDeBusca }
            name="campoDeBusca"
            onChange={ this.handleChange }
            data-testid="query-input"
          />
        </label>
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleClick }
        >
          Pesquisar

        </button>
        <div>
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <Link
            data-testid="shopping-cart-button"
            to="/cart"
          >
            Carrinho
          </Link>
        </div>
        <div>
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
        <div>
          <ul>
            {arrayProdutos.length !== 0
              ? arrayProdutos.map(({ title, price, thumbnail, id }) => (
                <Link
                  to={ `/productDetails/${id}` }
                  key={ id }
                  data-testid="product-detail-link"
                >
                  <li data-testid="product">
                    <p>{title}</p>
                    <p>{price}</p>
                    <img src={ thumbnail } alt={ title } />
                  </li>
                </Link>)) : <p>Nenhum produto foi encontrado</p>}
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
