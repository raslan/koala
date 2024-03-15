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
    <div className='animate-in mt-6 duration-700 transform'>
      <TypewriterEffect
        className='m-auto text-2xl'
        words={`${result}`.split(' ').map((w) => ({
          text: w,
        }))}
      />
      <h3 className='mt-8 scroll-m-20 pb-2 text-2xl font-semibold text-slate-600 dark:text-slate-300 tracking-tight transition-colors first:mt-0 text-center'>
        in {currencyNameFormatter.of(baseCurrency)}
      </h3>
    </div>
  );
};
