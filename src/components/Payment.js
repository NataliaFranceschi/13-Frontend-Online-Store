import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineBarcode } from 'react-icons/ai';
import { FaCcVisa, FaCcMastercard, FaCreditCard } from 'react-icons/fa';

export default class Payment extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <div className="pagamento">
        <label htmlFor="ticket-payment">
          Boleto
          <AiOutlineBarcode />
          <input
            type="radio"
            name="pagamento"
            data-testid="ticket-payment"
            value="boleto"
            onClick={ handleChange }
          />
        </label>
        <label htmlFor="visa-payment">
          Visa
          <FaCcVisa />
          <input
            type="radio"
            name="pagamento"
            data-testid="visa-payment"
            value="visa"
            onClick={ handleChange }
          />
        </label>
        <label htmlFor="master-payment">
          MasterCard
          <FaCcMastercard />
          <input
            type="radio"
            name="pagamento"
            data-testid="master-payment"
            value="mastercard"
            onClick={ handleChange }
          />
        </label>
        <label htmlFor="elo-payment">
          Elo
          <FaCreditCard />
          <input
            type="radio"
            name="pagamento"
            data-testid="elo-payment"
            value="elo"
            onClick={ handleChange }
          />
        </label>
      </div>
    );
  }
}

Payment.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
