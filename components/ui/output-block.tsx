import { currencyNameFormatter } from '@/lib/utils';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';

export const OutputBlock = ({
  result,
  baseCurrency,
}: {
  result: string;
  baseCurrency: string;
}) => {
  return (
    <div className='animate-in mt-2 duration-700 transform'>
      <TypewriterEffect
        className='m-auto text-2xl'
        words={`${result}`.split(' ').map((w) => ({
          text: w,
        }))}
      />
      <h3 className='scroll-my-10 mt-4 pb-2 text-2xl font-semibold text-gray-600 dark:text-gray-300 tracking-tight transition-colors first:mt-0 text-center'>
        in {currencyNameFormatter.of(baseCurrency)}
      </h3>
    </div>
  );
};
