import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { Draft } from 'immer';

export type Rates = Record<string, Record<string, number>>;

export type CurrenciesState = {
  rates: Rates;
  baseCurrency: string;
};

export type CurrenciesActions = {
  addCurrency: (currencyCode: string, rates: Record<string, number>) => void;
  setBaseCurrency: (currencyCode: string) => void;
  updateState: (updater: (state: Draft<CurrenciesState>) => void) => void;
};

export const useCurrenciesStore = create<CurrenciesState & CurrenciesActions>()(
  devtools(
    persist(
      immer((set) => ({
        rates: {},
        baseCurrency: 'USD',
        setBaseCurrency: (currency: string) =>
          set((state) => {
            state.baseCurrency = currency;
          }),
        addCurrency: (currencyCode, newRates) =>
          set((state) => {
            state.rates[currencyCode] = newRates;
          }),
        updateState: (updater: (state: Draft<CurrenciesState>) => void) =>
          set((state) => updater(state)),
      })),
      {
        name: 'currencies-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    ),
    {
      name: 'currencies-devtools',
    }
  )
);
