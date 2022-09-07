import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import ProductDetails from './Pages/ProductDetails';
import Checkout from './Pages/Checkout';
import 'bulma/css/bulma.min.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      arrayCarrinho: [],
      quantidadeProdutos: 0,
    };
  }

  componentDidMount = () => {
    const recoveredObject = JSON.parse(localStorage.getItem('produto'));
    if (recoveredObject !== null) {
      this.getAmount(recoveredObject);
      this.setState({ arrayCarrinho: recoveredObject });
    }
  }

  clickToAddOrRemove = (id, name, quantidade, disponivel) => {
    const { arrayCarrinho } = this.state;
    const newCart = arrayCarrinho.map((product) => {
      if (product.id === id) {
        if (quantidade === 1 && name === 'remove') return product;
        if (name === 'add' && quantidade < disponivel) product.quantidade += 1;
        if (name === 'remove') product.quantidade -= 1;
      }
      return product;
    });
    this.saveLocalStorage(newCart);
    this.setState({ arrayCarrinho: newCart });
  }

  removeFromCart = (id) => {
    const { arrayCarrinho } = this.state;
    const productRemoved = arrayCarrinho.filter((products) => products.id !== id);
    this.getAmount(productRemoved);
    localStorage.clear();
    if (productRemoved.length !== 0) {
      this.saveLocalStorage(productRemoved);
    }
    this.setState({ arrayCarrinho: productRemoved });
  }

  addCarrinho = (obj) => {
    const { title, price, id, quantity, thumbnail } = obj;
    const { arrayCarrinho } = this.state;
    const produto = {
      nome: title,
      preço: price,
      quantidade: 1,
      id,
      disponivel: quantity,
      imagem: thumbnail,
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
      }), this.saveLocalStorage);
    } else {
      this.setState({ arrayCarrinho: newCarrinho },
        this.saveLocalStorage);
    }
  }

  saveLocalStorage = (produtos) => {
    const { arrayCarrinho } = this.state;
    localStorage.setItem('produto', JSON.stringify(produtos ?? arrayCarrinho));
    this.getAmount(arrayCarrinho);
  }

  getAmount = (produtos) => {
    const quantidadeProdutos = produtos.reduce((acc, item) => (
      acc + item.quantidade), 0);
    this.setState({ quantidadeProdutos });
  }

  render() {
    const { quantidadeProdutos } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={ () => (<Home
                addCarrinho={ this.addCarrinho }
                quantidadeProdutos={ quantidadeProdutos }
              />) }
            />
            <Route
              exact
              path="/cart"
              render={ () => (<Cart
                removeFromCart={ this.removeFromCart }
                clickToAddOrRemove={ this.clickToAddOrRemove }
                quantidadeProdutos={ quantidadeProdutos }
              />) }
            />
            <Route
              exact
              path="/productDetails/:id"
              render={ (props) => (<ProductDetails
                { ...props }
                addCarrinho={ this.addCarrinho }
                quantidadeProdutos={ quantidadeProdutos }
              />
              ) }
            />
            <Route
              exact
              path="/checkout/"
              render={ (props) => (<Checkout
                { ...props }
                quantidadeProdutos={ quantidadeProdutos }
              />) }

            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
