export const baseThemes = [
  {
    theme: 'light',
    name: 'Light',
    mainBg: 'bg-gray-100',
    secondaryBg: 'bg-white',
    primaryBg: 'bg-gray-300',
  },
  {
    theme: 'dark',
    name: 'Dark',
    mainBg: 'bg-zinc-950',
    secondaryBg: 'bg-zinc-800',
    primaryBg: 'bg-zinc-400',
  },
];

export const extendedThemes = [
  {
    theme: 'rose-pine',
    name: 'Rose Pine',
    mainBg: 'bg-[#1a1825]',
    secondaryBg: 'bg-[#484463]',
    primaryBg: 'bg-[#3a345b]',
  },
  {
    theme: 'shadesofpurple',
    name: 'Shades of Purple',
    mainBg: 'bg-[#19182e]',
    secondaryBg: 'bg-[#151527]',
    primaryBg: 'bg-[#f3d246]',
  },
  {
    theme: 'deepblue',
    name: 'Deep Blue',
    mainBg: 'bg-[#061626]',
    secondaryBg: 'bg-[#04101d]',
    primaryBg: 'bg-[#c5e3f7]',
  },
];

export const themes = [
  ...baseThemes,
  ...extendedThemes,
  {
    theme: 'system',
    name: 'Auto',
    mainBg: 'bg-gray-100 dark:bg-zinc-950',
    secondaryBg: 'bg-white dark:bg-zinc-800',
    primaryBg: 'bg-gray-300 dark:bg-zinc-400',
  },
];

const extendedThemeValues = extendedThemes.map((t) => t.theme);

export function toggleClassOnHtml(className: string) {
  document?.documentElement?.classList?.toggle?.(className);
}

export function removeAllThemeClassFromHtml() {
  document?.documentElement?.classList?.remove?.(...extendedThemeValues);
}
