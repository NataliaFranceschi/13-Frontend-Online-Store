import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      isNotValid: false,
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
    const form = [nome, email, cpf, telefone,
      cep, endereco, pagamento];
    const isNotValid = form.some((item) => item.length === 0);
    this.setState({ isNotValid });
    if (!isNotValid) {
      localStorage.clear();
      history.push('/');
    }
  }

  render() {
    const { arrayCarrinho, nome, email, cpf, telefone,
      cep, endereco, isNotValid } = this.state;

    return (
      <div>
        { arrayCarrinho.map((item, index) => (
          <div key={ index }>
            <p>{item.nome}</p>
            <p>{`R$ ${item.preço * item.quantidade}`}</p>
          </div>
        ))}
        <form>
          <label htmlFor="checkout-fullname">
            Nome Completo
            <input
              type="text"
              data-testid="checkout-fullname"
              name="nome"
              value={ nome }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-email">
            Email
            <input
              type="email"
              data-testid="checkout-email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-cpf">
            CPF
            <input
              type="text"
              data-testid="checkout-cpf"
              name="cpf"
              value={ cpf }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-phone">
            Telefone
            <input
              type="text"
              data-testid="checkout-phone"
              name="telefone"
              value={ telefone }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-cep">
            CEP
            <input
              type="text"
              data-testid="checkout-cep"
              name="cep"
              value={ cep }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-address">
            Endereço
            <input
              type="text"
              data-testid="checkout-address"
              name="endereco"
              value={ endereco }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="ticket-payment">
            Boleto
            <input
              type="radio"
              name="pagamento"
              data-testid="ticket-payment"
              value="boleto"
              onClick={ this.handleChange }
            />
          </label>
          <label htmlFor="visa-payment">
            Visa
            <input
              type="radio"
              name="pagamento"
              data-testid="visa-payment"
              value="visa"
              onClick={ this.handleChange }
            />
          </label>
          <label htmlFor="master-payment">
            MasterCard
            <input
              type="radio"
              name="pagamento"
              data-testid="master-payment"
              value="mastercard"
              onClick={ this.handleChange }
            />
          </label>
          <label htmlFor="elo-payment">
            Elo
            <input type="radio" name="pagamento" data-testid="elo-payment" value="elo" />
          </label>
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ this.handleClick }
          >
            {' '}
            Enviar
          </button>
          { isNotValid && <span data-testid="error-msg"> Campos inválidos</span>}
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
