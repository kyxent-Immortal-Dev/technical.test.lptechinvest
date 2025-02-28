import { Theme } from "../types/ThemeType";

export interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}