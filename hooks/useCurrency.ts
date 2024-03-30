import { fetchRates } from '@/lib/actions';
import { evaluateNaturalExpression } from '@/lib/financial-tokenizer';
import { useCurrenciesStore } from '@/store/currencies';
import { useCallback, useEffect } from 'react';
import { useInterval } from 'usehooks-ts';

async function execute(
  baseCurrency: string,
  addCurrency: (currencyCode: string, rates: Record<string, number>) => void
) {
  const ratesResponse = await fetchRates(baseCurrency);
  addCurrency?.(baseCurrency, ratesResponse);
}

const useCurrency = () => {
  const { rates, addCurrency, baseCurrency, setBaseCurrency } =
    useCurrenciesStore();
  const refresh = useCallback(() => {
    execute(baseCurrency, addCurrency);
  }, [baseCurrency, addCurrency]);
  useInterval(() => refresh(), 600000);
  useEffect(() => {
    if (!rates?.[baseCurrency]) execute(baseCurrency, addCurrency);
  }, [baseCurrency, rates, addCurrency]);
  const evaluate = useCallback(
    (expr: string) => {
      return evaluateNaturalExpression(expr, baseCurrency, rates[baseCurrency]);
    },
    [baseCurrency, rates]
  );

  return {
    rates,
    refresh,
    addCurrency,
    baseCurrency,
    setBaseCurrency,
    evaluate,
  };
};
export default useCurrency;
