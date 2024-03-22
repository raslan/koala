'use client';
import { currenciesWithNames, currencyOptions } from '@/lib/utils';
import { DataTable } from '@/app/settings/[rates]/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { ComboBoxResponsive } from '@/components/ui/combobox';
import useCurrency from '@/hooks/useCurrency';
import { useMemo } from 'react';

export type TableRate = {
  currency: string;
  exchangeRate: string;
};

export const columns: ColumnDef<TableRate>[] = [
  {
    accessorKey: 'currency',
    header: 'Currency',
  },
  {
    accessorKey: 'exchangeRate',
    header: 'Exchange Rate',
  },
];

function formatCompactNumber(num: number): string {
  const formatter = new Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(num);
}

const Rates = () => {
  const { rates, baseCurrency, setBaseCurrency } = useCurrency();
  const tableRates: TableRate[] = useMemo(
    () =>
      rates?.[baseCurrency]
        ? Object.entries(rates?.[baseCurrency])
            .sort((currencyA, currencyB) => {
              // Check if either of the currencies is in the prioritized list
              const aPriority = currenciesWithNames.includes(currencyA[0]);
              const bPriority = currenciesWithNames.includes(currencyB[0]);

              // If both are in the prioritized list, sort them alphabetically
              if (aPriority && bPriority) {
                return currencyA[0].localeCompare(currencyB[0]);
              }
              // If only one is in the prioritized list, it should come first
              if (aPriority) {
                return -1;
              }
              if (bPriority) {
                return 1;
              }
              // If neither is in the prioritized list, sort them alphabetically
              return currencyA[0].localeCompare(currencyB[0]);
            })
            .map(([a, b]) => {
              return {
                currency:
                  currencyOptions?.find?.((opt) => opt.value === a)?.label || a,
                exchangeRate: formatCompactNumber(b),
              };
            }, [])
        : [],
    [rates, baseCurrency]
  );
  return (
    <div className='mt-4'>
      <ComboBoxResponsive
        options={currencyOptions}
        selectedOption={baseCurrency}
        setSelectedOption={setBaseCurrency}
      />
      <DataTable columns={columns} data={tableRates} />
    </div>
  );
};
export default Rates;
