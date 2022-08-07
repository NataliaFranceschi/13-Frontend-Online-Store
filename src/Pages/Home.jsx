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

  // renderProducts = () => {
  //   const { arrayProdutos } = this.state;
  //   return arrayProdutos.map(({ title, price, thumbnail }) => (
  //     <li key={ title }>
  //       <p>{title}</p>
  //       <p>{price}</p>
  //       <img src={ thumbnail } alt={ title } />
  //     </li>));
  // }

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
          { arrayCategorias.map(({ name }) => (
            <button
              key={ name }
              type="button"
              data-testid="category"
            >
              {name}
            </button>)) }
        </div>
        <div>
          <ul>
            {arrayProdutos.length !== 0
              ? arrayProdutos.map(({ title, price, thumbnail }) => (
                <li key={ title } data-testid="product">
                  <p>{title}</p>
                  <p>{price}</p>
                  <img src={ thumbnail } alt={ title } />
                </li>)) : <p>Nenhum produto foi encontrado</p>}
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
