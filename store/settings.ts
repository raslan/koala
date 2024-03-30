import { Draft } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type SettingsState = {
  notation: 'standard' | 'compact';
};

export type SettingsActions = {
  updateState: (updater: (state: Draft<SettingsState>) => void) => void;
};

export const useSettingsStore = create<SettingsState & SettingsActions>()(
  devtools(
    persist(
      immer((set) => ({
        notation: 'standard',
        updateState: (updater: (state: Draft<SettingsState>) => void) =>
          set((state) => updater(state)),
      })),
      {
        name: 'settings-storage',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    {
      name: 'settings-devtools',
    }
  )
);
