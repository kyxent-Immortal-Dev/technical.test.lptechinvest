import { useEffect } from 'react'
import { initializeTheme } from './store/themeStore'
import UserPage from './pages/UserPage'

export default function App() {
  

  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    
    <>

    <UserPage/>

    </>
  )
}