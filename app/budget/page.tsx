'use client';
import { Heading } from '@/components/ui/heading';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const BudgetPage = () => {
  return (
    <div className='h-full'>
      <Heading>Budget</Heading>
      <div className='flex flex-col justify-start items-start py-4 dark:p-4 w-full h-full'>
        <p className='my-3'>
          Coming soon! In the meantime here is a credit card component.
        </p>
        <div>
          <Cards
            issuer='elo'
            number='••••••••••••••••'
            preview={true}
            expiry=''
            cvc='000'
            name='Credit Card 1'
          />
        </div>
      </div>
    </div>
  );
};
export default BudgetPage;
