import NavbarComponent from '../components/NavbarComponent'
import UsersListComponent from '../components/UsersListComponent'
import FooterComponent from '../components/FooterComponent'
import { useThemeStore } from '../store/themeStore';

export default function UsersLayout() {
    const theme = useThemeStore((state) => state.theme);
  return (
    <>
    
    <div className={`d-flex flex-column min-vh-100 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <NavbarComponent />
      <main className="flex-grow-1">
        <UsersListComponent />
      </main>
      <FooterComponent />
    </div>
    </>
  )
}
