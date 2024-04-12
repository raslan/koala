'use client';
import RatesDrawer from '@/app/(rates)/rates-drawer';
import { Button } from '@/components/ui/button';
import { ComboBoxResponsive } from '@/components/ui/combobox';
import { OutputBlock } from '@/components/ui/output-block';
import useCurrency from '@/hooks/useCurrency';
import { prettyPrint } from '@/lib/financial-tokenizer';
import { cn, currencyOptions } from '@/lib/utils';
import { useSettingsStore } from '@/store/settings';
import {
  ArrowUpIcon,
  EraserIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons';
import { Dinero } from 'dinero.js';
import { useEffect, useState } from 'react';
import TextInput from 'react-autocomplete-input';
import { toast } from 'sonner';

const fillableCurrencyOptions = currencyOptions?.map?.(
  (option) => option.label
);

const CalculatorBlock = ({
  hideButtons = false,
  small = false,
  preset = '',
}: {
  hideButtons?: boolean;
  small?: boolean;
  preset?: string;
}) => {
  const [result, setResult] = useState<Dinero<number> | undefined>();
  const { rates, baseCurrency, setBaseCurrency, evaluate } = useCurrency();
  const [overrideCurrency, setOverrideCurrency] = useState<
    string | undefined
  >();
  const [entry, setEntry] = useState(preset);
  const { notation } = useSettingsStore();
  useEffect(() => {
    if (rates?.USD) {
      if (entry && rates?.[baseCurrency]) {
        try {
          let modifiedEntry = entry;
          const regex = /(to|in)\s([A-Za-z]{3})\s+?$/;
          const match = entry.match(regex);
          if (match) {
            modifiedEntry = entry.replace(regex, '');
            const currencyCode = match[2]?.toUpperCase?.();
            setOverrideCurrency(currencyCode);
            setResult(evaluate(modifiedEntry?.trim?.() ?? '', currencyCode));
          } else {
            setOverrideCurrency(undefined);
            setResult(evaluate(entry));
          }
        } catch (error) {
          setOverrideCurrency(undefined);
          setResult(undefined);
        }
      } else {
        setOverrideCurrency(undefined);
        setResult(undefined);
      }
    }
  }, [entry, baseCurrency, rates, evaluate]);
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
        <TextInput
          placeholder='Enter your equation to start calculating...'
          value={entry}
          aria-label='Enter your equation to start calculating...'
          aria-required
          aria-invalid={Boolean(entry && !result)}
          aria-describedby='Calculation-Input'
          maxOptions={1000}
          onChange={(e: string) => setEntry(e)}
          changeOnSelect={(_: any, s: string) => {
            return (
              ' ' +
              currencyOptions?.find?.((option) => option.label === s)?.value
            );
          }}
          trigger={['. ', '  ', '@']}
          matchAny
          options={{
            '. ': fillableCurrencyOptions,
            '  ': fillableCurrencyOptions,
            '@': fillableCurrencyOptions,
          }}
          className={cn(
            'flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            'text-2xl text-center font-semibold border-primary/20 border-2',
            small ? 'my-4' : 'mt-4 md:mt-8 py-8 md:pt-16 md:pb-8 md:text-3xl'
          )}
        />
        {!small && (
          <div className='flex flex-col lg:flex-row m-auto lg:max-w-xl'>
            <div className='flex w-full justify-between'>
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
              <ComboBoxResponsive
                options={currencyOptions}
                selectedOption={'+ Add a currency'}
                buttonText='+ Add a currency'
                setSelectedOption={(option) => {
                  setEntry(entry.trim() + ` ${option} `);
                }}
              />
            </div>
            <div className='flex w-full justify-between'>
              <Button
                onClick={() => {
                  result &&
                    setEntry(
                      `${prettyPrint(result as Dinero<number>, {
                        currencyDisplay: 'code',
                      })}`
                    );
                }}
                variant='ghost'
              >
                <ArrowUpIcon className='mr-1' />
                Use just output
              </Button>
              <Button
                onClick={() => {
                  result &&
                    setEntry(
                      entry +
                        ` + ${prettyPrint(result as Dinero<number>, {
                          currencyDisplay: 'code',
                        })}`
                    );
                }}
                variant='ghost'
                className='font-bold'
              >
                <PlusCircledIcon className='mr-1' />
                Add output back
              </Button>
            </div>
          </div>
        )}
      </div>
      {entry && Boolean(rates?.[baseCurrency]) && (
        <OutputBlock
          result={
            result
              ? prettyPrint(result as Dinero<number>, {
                  notation,
                  overrideCurrency,
                })
              : '...'
          }
          baseCurrency={overrideCurrency ?? baseCurrency}
          small={small}
        />
      )}
    </>
  );
};
export default CalculatorBlock;
