import { Heading } from '@/components/ui/heading';
import { BudgetDashboard } from './grid';

const BudgetPage = () => {
  return (
    <div className='h-full'>
      <Heading>Budget (Demo!)</Heading>
      <BudgetDashboard />
    </div>
  );
};
export default BudgetPage;
