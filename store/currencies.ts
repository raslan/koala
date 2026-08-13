import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, devtools, createJSONStorage, StateStorage } from 'zustand/middleware';
import { Draft } from 'immer';

const splitStorage: StateStorage = {
  getItem: (name) => {
    const session = sessionStorage.getItem(name);
    const base = localStorage.getItem(`${name}-base`);
    if (!session && !base) return null;
    const parsed = session ? JSON.parse(session) : { state: {}, version: 0 };
    if (base) parsed.state.baseCurrency = JSON.parse(base);
    return JSON.stringify(parsed);
  },
  setItem: (name, value) => {
    const parsed = JSON.parse(value);
    const { baseCurrency, ...restState } = parsed.state;
    localStorage.setItem(`${name}-base`, JSON.stringify(baseCurrency));
    sessionStorage.setItem(name, JSON.stringify({ ...parsed, state: restState }));
  },
  removeItem: (name) => {
    sessionStorage.removeItem(name);
    localStorage.removeItem(`${name}-base`);
  },
};

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
        storage: createJSONStorage(() => splitStorage),
      }
    ),
    {
      name: 'currencies-devtools',
    }
  )
);
