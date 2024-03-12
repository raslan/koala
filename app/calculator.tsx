'use client';
import { Button } from '@/components/ui/button';
import { ComboBoxResponsive } from '@/components/ui/combobox';
import { Heading } from '@/components/ui/heading';
import { Label } from '@/components/ui/label';
import { OutputBlock } from '@/components/ui/output-block';
import { Textarea } from '@/components/ui/textarea';
import useCurrency from '@/hooks/useCurrency';
import { useDebounce } from '@/hooks/useDebounce';
import { evaluateNaturalExpression } from '@/lib/financial-tokenizer';
import { currencyOptions } from '@/lib/utils';
import { useEffect, useState } from 'react';

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
              evaluateNaturalExpression(
                entry,
                baseCurrency,
                rates[baseCurrency]
              )
            );
          } catch (error) {
            setResult('Incorrect input.');
          }
        } else {
          setResult('');
        }
      }, 150);
    }
  }, [entry, baseCurrency, rates, debounce]);

  return (
    <div>
      <Heading>Home</Heading>
      <div className='flex flex-col lg:flex-row py-8 max-w-xl gap-4'>
        <Button
          onClick={() => {
            setEntry('$10 * 2 + 10 * 20000egp + eur10000 / 4 - 5USD');
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
      <div className='w-full flex flex-col'>
        <Label className='text-3xl' htmlFor='equation-input'>
          The Calculator
        </Label>
        <Textarea
          id='equation-input'
          placeholder='Enter your equation to start calculating...'
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className='text-2xl lg:text-3xl mt-8 py-12 lg:pt-16 lg:pb-8 text-center font-semibold'
        />
      </div>
      {Boolean(rates?.[baseCurrency]) && result && (
        <OutputBlock result={result} baseCurrency={baseCurrency} />
      )}
    </div>
  );
}
