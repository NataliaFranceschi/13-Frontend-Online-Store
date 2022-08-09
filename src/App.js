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

  componentDidMount = () => {
    const xablau = Object.values(localStorage);
    const mapXablau = xablau.map((produto) => JSON.parse(produto));
    console.log((mapXablau));
    this.setState({ arrayCarrinho: mapXablau });
  }

  clickToAddOrRemove = (id, name, quantidade) => {
    const { arrayCarrinho } = this.state;
    const newCart = arrayCarrinho.map((product) => {
      if (product.id === id) {
        if (quantidade === 1 && name === 'remove') return product;
        if (name === 'add') product.quantidade += 1;
        if (name === 'remove') product.quantidade -= 1;
      }
      return product;
    });
    localStorage.clear();
    newCart.forEach((xablau) => {
      localStorage.setItem(xablau.id, JSON.stringify(xablau));
    });
    this.setState({ arrayCarrinho: newCart });
  }

  removeFromCart = (id) => {
    const { arrayCarrinho } = this.state;
    const productRemoved = arrayCarrinho.filter((products) => products.id !== id);
    localStorage.clear();
    productRemoved.forEach((xablau) => {
      localStorage.setItem(xablau.id, JSON.stringify(xablau));
    });
    this.setState({ arrayCarrinho: productRemoved });
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
      }), this.localStorageM);
    } else { this.setState({ arrayCarrinho: newCarrinho }, this.localStorageM); }
  }

  localStorageM = () => {
    localStorage.clear();
    const { arrayCarrinho } = this.state;
    arrayCarrinho.forEach((xablau) => {
      localStorage.setItem(xablau.id, JSON.stringify(xablau));
    });
  }

  render() {
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
                removeFromCart={ this.removeFromCart }
                clickToAddOrRemove={ this.clickToAddOrRemove }
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
