import { cn, currencyNameFormatter } from '@/lib/utils';
import { useCopyToClipboard } from 'usehooks-ts';
import { Button } from './button';
import { toast } from 'sonner';
import { CopyIcon } from '@radix-ui/react-icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

export const OutputBlock = ({
  result,
  baseCurrency,
  small = false,
}: {
  result: string;
  baseCurrency: string;
  small?: boolean;
}) => {
  const [, copy] = useCopyToClipboard();
  return (
    <div className='animate-in mt-2 duration-700 transform flex flex-col items-center'>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                copy(result);
                toast.success('Output copied to clipboard!', {
                  position: 'top-right',
                });
              }}
              variant='ghost'
              className={cn(
                'py-6 font-bold text-center',
                small ? 'text-2xl' : 'text-2xl md:text-3xl lg:text-5xl'
              )}
            >
              {result} <CopyIcon className='ml-2 w-6 h-6' />
            </Button>
          </TooltipTrigger>
          <TooltipContent className='bg-primary/90 mb-2'>
            <span className='font-bold'>Click to copy to clipboard</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
