import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Pages/Home';
import Cart from '../Pages/Cart';
import ProductDetails from '../Pages/ProductDetails';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/productDetails/:id" component={ ProductDetails } />
      </Switch>
    );
  }
}

export default Routes;
