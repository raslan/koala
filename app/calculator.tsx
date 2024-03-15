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
          <svg
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M3.49997 12.8995C2.71892 13.6805 2.71892 14.9468 3.49997 15.7279L7.35785 19.5858H4.08576C3.53347 19.5858 3.08576 20.0335 3.08576 20.5858C3.08576 21.1381 3.53347 21.5858 4.08576 21.5858H20.0858C20.638 21.5858 21.0858 21.1381 21.0858 20.5858C21.0858 20.0335 20.638 19.5858 20.0858 19.5858H10.9558L20.4705 10.071C21.2516 9.28999 21.2516 8.02366 20.4705 7.24261L16.2279 2.99997C15.4468 2.21892 14.1805 2.21892 13.3995 2.99997L3.49997 12.8995ZM7.82579 11.4021L4.91418 14.3137L9.15683 18.5563L12.0684 15.6447L7.82579 11.4021ZM9.24 9.98787L13.4826 14.2305L19.0563 8.65683L14.8137 4.41418L9.24 9.98787Z'
              fill='currentColor'
            />
          </svg>
          Clear Input
        </Button>
      </div>
      {entry && Boolean(rates?.[baseCurrency]) && result && (
        <OutputBlock result={result} baseCurrency={baseCurrency} />
      )}
    </div>
  );
}
