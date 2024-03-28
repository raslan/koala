import CreditCard from '@/components/ui/credit-card';
import { Heading } from '@/components/ui/heading';

const BudgetPage = () => {
  return (
    <div className='h-full'>
      <Heading>Budget</Heading>
      <div className='flex flex-col justify-start items-start py-4 dark:p-4 w-full h-full'>
        <p className='my-3'>
          Coming soon! In the meantime here is a credit card component.
        </p>
        <div>
          <CreditCard />
        </div>
      </div>
    </div>
  );
};
export default BudgetPage;
