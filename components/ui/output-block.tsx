import { cn, currencyNameFormatter } from '@/lib/utils';

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
      <p
        className={cn(
          'm-auto font-bold text-center',
          small ? 'text-2xl' : 'text-2xl md:text-3xl lg:text-5xl'
        )}
      >
        {result}
      </p>
      <p
        className={cn(
          'scroll-my-10 mt-4 pb-2 font-semibold text-primary tracking-tight transition-colors first:mt-0 text-center',
          small ? 'text-base' : 'text-2xl md:text-3xl'
        )}
      >
        in {currencyNameFormatter.of(baseCurrency)}
      </p>
    </div>
  );
};
