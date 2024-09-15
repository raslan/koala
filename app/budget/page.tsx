import { Heading } from '@/components/ui/heading';
import { BudgetCalculator } from './grid';

const BudgetPage = () => {
  return (
    <div className='h-full'>
      <Heading>Budget</Heading>
      <BudgetCalculator />
    </div>
  );
};
export default BudgetPage;
