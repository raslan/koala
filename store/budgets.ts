import { Draft } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type BudgetState = {
  budget: {
    income: {
      id?: string;
      lineItems: Record<string, unknown>[];
    };
    expenses: {
      id?: string;
      lineItems: Record<string, unknown>[];
    };
  };
};

export type BudgetActions = {
  updateState: (updater: (state: Draft<BudgetState>) => void) => void;
  setBudget: (budget: BudgetState['budget']) => void;
};

export const useBudgetStore = create<BudgetState & BudgetActions>()(
  devtools(
    persist(
      immer((set) => ({
        budget: {
          income: {
            lineItems: [],
          },
          expenses: {
            lineItems: [],
          },
        },
        updateState: (updater: (state: Draft<BudgetState>) => void) =>
          set((state) => updater(state)),
        setBudget: (budget) => {
          set((state) => {
            state.budget = budget;
          });
        },
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
