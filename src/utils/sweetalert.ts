import Swal, { SweetAlertOptions } from 'sweetalert2';
import { useThemeStore } from '../store/themeStore';

export const showAlert = (options: SweetAlertOptions) => {
  const theme = useThemeStore.getState().theme;
  const isDarkTheme = theme === 'dark';
  
  return Swal.fire({
    ...options,
    background: isDarkTheme ? '#212529' : '#fff',
    color: isDarkTheme ? '#f8f9fa' : '#000'
  });
};