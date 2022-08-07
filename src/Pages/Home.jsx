import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      campoDeBusca: '',
      arrayCategorias: [],
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

  render() {
    const { campoDeBusca, arrayCategorias } = this.state;
    return (
      <div>
        <label htmlFor="input">
          <input
            type="text"
            id="input"
            value={ campoDeBusca }
            name="campoDeBusca"
            onChange={ this.handleChange }
          />
        </label>
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
      </div>
    );
  }
}

export default Home;
