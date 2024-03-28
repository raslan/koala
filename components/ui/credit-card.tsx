'use client';

import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const CreditCard = () => (
  <Cards
    issuer='elo'
    number='••••••••••••••••'
    preview={true}
    expiry=''
    cvc='000'
    name='Credit Card 1'
  />
);

export default CreditCard;
