import CalculatorBlock from '@/components/calculator';
import { Heading } from '@/components/ui/heading';

export default function HomePage() {
  return (
    <div className='h-full'>
      <Heading>Calculator</Heading>
      <CalculatorBlock />
    </div>
  );
}
