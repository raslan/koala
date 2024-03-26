'use client';
import { Button } from '@/components/ui/button';
import { ComboBoxResponsive } from '@/components/ui/combobox';
import { OutputBlock } from '@/components/ui/output-block';
import { Textarea } from '@/components/ui/textarea';
import useCurrency from '@/hooks/useCurrency';
import {
  evaluateNaturalExpression,
  prettyPrint,
} from '@/lib/financial-tokenizer';
import { cn, currencyOptions } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import RatesDrawer from '@/app/(rates)/rates-drawer';
import {
  ArrowUpIcon,
  EraserIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons';
import { useSettingsStore } from '@/store/settings';

const CalculatorBlock = ({
  hideButtons = false,
  small = false,
  preset = '',
}: {
  hideButtons?: boolean;
  small?: boolean;
  preset?: string;
}) => {
  const [result, setResult] = useState('');
  const { rates, baseCurrency, setBaseCurrency } = useCurrency();
  const [entry, setEntry] = useState(preset);
  const { notation } = useSettingsStore();
  useEffect(() => {
    if (rates?.USD) {
      if (entry && rates?.[baseCurrency]) {
        try {
          setResult(
            prettyPrint(
              evaluateNaturalExpression(
                entry?.toLowerCase(),
                baseCurrency,
                rates[baseCurrency]
              ),
              {
                notation,
              }
            )
          );
        } catch (error) {
          setResult('...');
        }
      } else {
        setResult('');
      }
    }
  }, [entry, baseCurrency, rates, notation]);
  return (
    <>
      {!hideButtons && (
        <div className='flex flex-col md:flex-row py-2 max-w-xl gap-2 lg:gap-2.5 mt-2'>
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
          <div className='flex max-w-sm'>
            <Button
              onClick={() => {
                setEntry(result);
              }}
              variant='ghost'
              className='font-bold hidden md:inline-flex'
            >
              <ArrowUpIcon className='mr-1' />
              Use just output
            </Button>
            <Button
              onClick={() => {
                setEntry('');
                toast.info('Input cleared.', {
                  position: 'top-right',
                });
              }}
              variant='ghost'
              className='font-bold'
            >
              <EraserIcon className='mr-1' />
              Clear
            </Button>
            <Button
              onClick={() => {
                setEntry(entry + ` + ${result}`);
              }}
              variant='ghost'
              className='font-bold hidden md:inline-flex'
            >
              <PlusCircledIcon className='mr-1' />
              Add output back
            </Button>
          </div>
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
