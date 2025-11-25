import { useTheme as useNextTheme } from "next-themes";

/**
 * useTheme Hook
 * Wrapper around next-themes useTheme hook
 * Provides access to current theme and theme setter
 * @returns {theme, setTheme} - Current theme and function to change it
 */
export const useTheme = () => {
  const { theme, setTheme } = useNextTheme();
  return { theme, setTheme };
};
