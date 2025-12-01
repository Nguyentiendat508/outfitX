import './App.css'
import { AuthContext } from './contexts/AuthProvider'
import { useContext } from 'react'
import Home from './pages/client/home/Home';
import Main from './pages/client/main/Main';
import HomeAdmin from './pages/admin/home_admin/HomeAdmin';

function App() {
  const { accountLogin } = useContext(AuthContext);
  return (
    <>
      {
        accountLogin?.role == "admin" ? <HomeAdmin/> : <Home/>
      }
    </>
  )
}

export default App
