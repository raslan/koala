'use client';
import ClearIcon from '@/components/icons/clear';
import { Button } from '@/components/ui/button';
import { ComboBoxResponsive } from '@/components/ui/combobox';
import { OutputBlock } from '@/components/ui/output-block';
import { Textarea } from '@/components/ui/textarea';
import useCurrency from '@/hooks/useCurrency';
import { useDebounce } from '@/hooks/useDebounce';
import {
  evaluateNaturalExpression,
  prettyPrint,
} from '@/lib/financial-tokenizer';
import { cn, currencyOptions } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import RatesDrawer from '@/app/(rates)/rates-drawer';

const CalculatorBlock = ({
  hideButtons = false,
  small = false,
  preset = '',
}: {
  hideButtons?: boolean;
  small?: boolean;
  preset?: string;
}) => {
  const debounce = useDebounce();
  const [result, setResult] = useState('');
  const { rates, baseCurrency, setBaseCurrency } = useCurrency();
  const [entry, setEntry] = useState(preset);

  useEffect(() => {
    if (rates?.USD) {
      debounce(() => {
        if (entry && rates?.[baseCurrency]) {
          try {
            setResult(
              prettyPrint(
                evaluateNaturalExpression(
                  entry,
                  baseCurrency,
                  rates[baseCurrency]
                )
              )
            );
          } catch (error) {
            setResult('...');
          }
        } else {
          setResult('');
        }
      }, 150);
    }
  }, [entry, baseCurrency, rates, debounce]);
  return (
    <>
      {!hideButtons && (
        <div className='flex flex-col md:flex-row py-8 max-w-xl gap-4'>
          <Button
            onClick={() => {
              setEntry(
                '(10k * 2 + 10 * (20k egp + eur10 thousand) / 4 - 5) + 10k'
              );
              toast.info('Demo equation entered.', {
                position: 'top-right',
              });
            }}
          >
            Insert Demo Equation
          </Button>
          <ComboBoxResponsive
            options={currencyOptions}
            selectedOption={baseCurrency}
            setSelectedOption={setBaseCurrency}
          />
          <RatesDrawer />
        </div>
      )}
      <div className='w-full flex flex-col items-center justify-between gap-3'>
        <Textarea
          id='equation-input'
          placeholder='Enter your equation to start calculating...'
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className={cn(
            'text-2xl text-center font-semibold border-primary/20 border-2',
            small ? 'my-4' : 'mt-4 md:mt-8 py-8 md:pt-16 md:pb-8 md:text-3xl'
          )}
        />
        {!small && (
          <Button
            onClick={() => {
              setEntry('');
              toast.info('Input cleared.', {
                position: 'top-right',
              });
            }}
            variant='ghost'
          >
            <ClearIcon />
            Clear Input
          </Button>
        )}
      </div>
      {entry && Boolean(rates?.[baseCurrency]) && result && (
        <OutputBlock
          result={result}
          baseCurrency={baseCurrency}
          small={small}
        />
      )}
    </>
  );
};
export default CalculatorBlock;
