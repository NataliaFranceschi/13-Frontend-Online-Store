import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Pages/Home';
import Cart from '../Pages/Cart';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/cart" component={ Cart } />
      </Switch>
    );
  }
}

export default Routes;
