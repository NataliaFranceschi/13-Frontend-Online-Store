import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import ProductDetails from './Pages/ProductDetails';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      arrayCarrinho: [],
    };
  }

  addCarrinho = (title, price, id) => {
    const { arrayCarrinho } = this.state;
    const produto = {
      nome: title,
      preço: price,
      quantidade: 1,
      id,
    };
    const newCarrinho = arrayCarrinho.map((product) => {
      if (product.id === id) {
        product.quantidade += 1;
      }
      return product;
    });
    if (!arrayCarrinho.some((item) => id === item.id)) {
      this.setState((prevState) => ({
        arrayCarrinho: [...prevState.arrayCarrinho, produto],
      }));
    } else { this.setState({ arrayCarrinho: newCarrinho }); }
  }

  render() {
    const { arrayCarrinho } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={ () => (<Home
                addCarrinho={ this.addCarrinho }
              />) }
            />
            <Route
              exact
              path="/cart"
              render={ () => (<Cart
                arrayCarrinho={ arrayCarrinho }
              />) }
            />
            <Route
              exact
              path="/productDetails/:id"
              render={ (props) => (<ProductDetails
                { ...props }
                addCarrinho={ this.addCarrinho }
              />
              ) }
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
