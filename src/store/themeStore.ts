import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme } from '../types/ThemeType';
import { ThemeState } from '../interfaces/ThemeInterface';




export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: (localStorage.getItem('theme') as Theme) || 'light',
      toggleTheme: () => set((state: ThemeState) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-bs-theme', newTheme);
        if (newTheme === 'dark') {
          document.body.classList.add('bg-dark');
          document.body.classList.remove('bg-light');
        } else {
          document.body.classList.add('bg-light');
          document.body.classList.remove('bg-dark');
        }
        return { theme: newTheme };
      }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

export const initializeTheme = () => {
  const theme = useThemeStore.getState().theme;
  document.body.setAttribute('data-bs-theme', theme);
  if (theme === 'dark') {
    document.body.classList.add('bg-dark');
    document.body.classList.remove('bg-light');
  } else {
    document.body.classList.add('bg-light');
    document.body.classList.remove('bg-dark');
  }
};