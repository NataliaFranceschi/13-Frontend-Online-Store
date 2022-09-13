import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../styles/checkout.scss';
import Payment from '../components/Payment';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      arrayCarrinho: [],
      nome: '',
      email: '',
      cpf: '',
      telefone: '',
      cep: '',
      endereco: '',
      pagamento: '',
      isValid: false,
    };
  }

  componentDidMount = () => {
    const recoveredObject = JSON.parse(localStorage.getItem('produto'));
    if (recoveredObject !== null) {
      this.setState({ arrayCarrinho: recoveredObject });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { history } = this.props;
    const { nome, email, cpf, telefone,
      cep, endereco, pagamento } = this.state;
    const form = [nome, cpf, telefone,
      cep, endereco, pagamento];
    const isValid1 = form.every((item) => item.length !== 0);
    const padraoEmail = /\S+@\S+\.\S+/;
    const isValid2 = padraoEmail.test(email);
    const isValid = isValid1 && isValid2;
    this.setState({ isValid });
    if (isValid) {
      localStorage.clear();
      history.push('/13-Frontend-Online-Store/');
    }
  }

  render() {
    const { arrayCarrinho, nome, email, cpf, telefone,
      cep, endereco, isValid } = this.state;
    const { quantidadeProdutos } = this.props;
    const total = arrayCarrinho
      .reduce((acc, { preço, quantidade }) => acc + (preço * quantidade), 0);
    return (
      <div>
        <Header quantidadeProdutos={ quantidadeProdutos } />
        <div className="checkout">
          <div className="checkoutItems">
            <ul>
              { arrayCarrinho.map((item, index) => (
                <li key={ index }>
                  <img src={ item.imagem.replace('-I', '-O') } alt={ item.nome } />
                  <p className="product">{item.nome}</p>
                  <p className="price">{`R$ ${item.preço * item.quantidade}`}</p>
                </li>
              ))}
            </ul>
            <p className="total">{`Total : R$ ${total.toFixed(2)}`}</p>
          </div>
          <form>
            <fieldset>
              {' '}
              Informações pessoal
              <input
                type="text"
                data-testid="checkout-fullname"
                name="nome"
                value={ nome }
                onChange={ this.handleChange }
                className="input is-warning"
                placeholder="Nome Completo"
              />
              <input
                type="email"
                data-testid="checkout-email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                className="input is-warning"
                placeholder="E-mail"
              />
              <input
                type="text"
                data-testid="checkout-cpf"
                name="cpf"
                value={ cpf }
                onChange={ this.handleChange }
                className="input is-warning"
                placeholder="CPF"
              />
              <input
                type="text"
                data-testid="checkout-phone"
                name="telefone"
                value={ telefone }
                onChange={ this.handleChange }
                className="input is-warning"
                placeholder="Telefone"
              />
              <input
                type="text"
                data-testid="checkout-cep"
                name="cep"
                value={ cep }
                onChange={ this.handleChange }
                className="input is-warning"
                placeholder="CEP"
              />
              <input
                type="text"
                data-testid="checkout-address"
                name="endereco"
                value={ endereco }
                onChange={ this.handleChange }
                className="input is-warning"
                placeholder="Endereço"
              />
            </fieldset>
            <Payment handleChange={ this.handleChange } />
            <button
              type="button"
              data-testid="checkout-btn"
              onClick={ this.handleClick }
              className="button"
            >
              {' '}
              Enviar
            </button>
            { !isValid && <span data-testid="error-msg"> Campos inválidos</span>}
          </form>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  quantidadeProdutos: PropTypes.number.isRequired,
};

export default Checkout;
