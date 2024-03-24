import { cn, currencyNameFormatter } from '@/lib/utils';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';

export const OutputBlock = ({
  result,
  baseCurrency,
  small = false,
}: {
  result: string;
  baseCurrency: string;
  small?: boolean;
}) => {
  return (
    <div className='animate-in mt-2 duration-700 transform'>
      <TypewriterEffect
        className={cn(
          'm-auto font-bold text-center',
          small ? 'text-2xl' : 'text-base sm:text-xl md:text-3xl lg:text-5xl'
        )}
        words={`${result}`.split(' ').map((w) => ({
          text: w,
        }))}
      />
      <h3
        className={cn(
          'scroll-my-10 mt-4 pb-2 font-semibold text-primary tracking-tight transition-colors first:mt-0 text-center',
          small ? 'text-base' : 'text-2xl'
        )}
      >
        in {currencyNameFormatter.of(baseCurrency)}
      </h3>
    </div>
  );
};
