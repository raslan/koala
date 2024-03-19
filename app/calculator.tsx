'use client';
import ClearIcon from '@/components/icons/clear';
import { Button } from '@/components/ui/button';
import { ComboBoxResponsive } from '@/components/ui/combobox';
import { Heading } from '@/components/ui/heading';
import { OutputBlock } from '@/components/ui/output-block';
import { Textarea } from '@/components/ui/textarea';
import useCurrency from '@/hooks/useCurrency';
import { useDebounce } from '@/hooks/useDebounce';
import {
  evaluateNaturalExpression,
  prettyPrint,
} from '@/lib/financial-tokenizer';
import { currencyOptions } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function HomePage() {
  const debounce = useDebounce();
  const [result, setResult] = useState('');
  const { rates, baseCurrency, setBaseCurrency } = useCurrency();
  const [entry, setEntry] = useState('');

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
    <div>
      <Heading>Calculator</Heading>

      <div className='flex flex-col lg:flex-row py-8 max-w-xl gap-4'>
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
      </div>
      <div className='w-full flex flex-col items-center justify-between gap-3'>
        <Textarea
          id='equation-input'
          placeholder='Enter your equation to start calculating...'
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className='text-xl lg:text-3xl mt-4 lg:mt-8 py-8 lg:pt-16 lg:pb-8 text-center font-semibold'
        />
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
      </div>
      {entry && Boolean(rates?.[baseCurrency]) && result && (
        <OutputBlock result={result} baseCurrency={baseCurrency} />
      )}
    </div>
  );
}
