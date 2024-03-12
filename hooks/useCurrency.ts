import { fetchRates } from '@/lib/actions';
import { useCurrenciesStore } from '@/store/currencies';
import { useEffect } from 'react';

const useCurrency = () => {
  const { rates, addCurrency, baseCurrency, setBaseCurrency } =
    useCurrenciesStore();
  useEffect(() => {
    async function execute() {
      const ratesResponse = await fetchRates(baseCurrency);
      addCurrency?.(baseCurrency, ratesResponse);
    }
    if (!rates?.[baseCurrency]) execute();
  }, [baseCurrency, rates, addCurrency]);

  return { rates, addCurrency, baseCurrency, setBaseCurrency };
};
export default useCurrency;
