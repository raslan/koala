import { Draft } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type BudgetState = {
  income: Map<string, Record<string, unknown>>;
  expenses: Map<string, Record<string, unknown>>;
  subscriptions: Map<string, Record<string, unknown>>;
  buckets: Map<string, Record<string, unknown>>;
  categories?: Map<string, Record<string, unknown>>;
};

export type BudgetActions = {
  updateState: (updater: (state: Draft<BudgetState>) => void) => void;
};

export const useBudgetStore = create<BudgetState & BudgetActions>()(
  devtools(
    persist(
      immer((set) => ({
        income: new Map(),
        expenses: new Map(),
        subscriptions: new Map(),
        buckets: new Map(),
        updateState: (updater: (state: Draft<BudgetState>) => void) =>
          set((state) => updater(state)),
      })),
      {
        name: 'budget-storage',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    {
      name: 'budget-devtools',
    }
  )
);
