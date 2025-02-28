import UsersListComponent from './components/UsersListComponent'
import NavbarComponent from './components/NavbarComponent'
import FooterComponent from './components/FooterComponent'
import { useEffect } from 'react'
import { initializeTheme } from './store/themeStore'
import { useThemeStore } from './store/themeStore'

export default function App() {
  const theme = useThemeStore((state) => state.theme);
  

  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <div className={`d-flex flex-column min-vh-100 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <NavbarComponent />
      <main className="flex-grow-1">
        <UsersListComponent />
      </main>
      <FooterComponent />
    </div>
  )
}