import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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

  // addCarrinho = (title, price) => {
  //   const produto = {
  //     nome: title,
  //     preço: price,
  //   };
  //   console.log(produto);
  //   this.setState((prevState) => ({
  //     arrayCarrinho: [...prevState.arrayCarrinho, produto],
  //   }));
  // }

  render() {
    const { addCarrinho } = this.props;
    // console.log(arrayCarrinho);
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
                <div key={ id }>
                  <Link
                    to={ `/productDetails/${id}` }
                    data-testid="product-detail-link"
                  >
                    <li data-testid="product">
                      <p>{title}</p>
                      <p>
                        R$
                        {price}
                      </p>
                      <img src={ thumbnail } alt={ title } />
                    </li>
                  </Link>
                  <button
                    type="button"
                    data-testid="product-add-to-cart"
                    onClick={ () => addCarrinho(title, price, id) }
                  >
                    Adicionar ao carrinho

                  </button>
                </div>
              )) : <p>Nenhum produto foi encontrado</p>}
          </ul>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  addCarrinho: PropTypes.func.isRequired,
};

export default Home;
