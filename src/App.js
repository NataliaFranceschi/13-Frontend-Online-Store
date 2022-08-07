import React from 'react';
import './App.css';
import { getCategories } from './services/api';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        { getCategories() }
        <p>asdasda</p>
      </div>
    );
  }
}

export default App;
