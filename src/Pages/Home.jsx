import React from 'react';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      campoDeBusca: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { campoDeBusca } = this.state;
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
        </div>
      </div>
    );
  }
}

export default Home;
