import './App.css'
import { AuthContext } from './contexts/AuthProvider'
import { useContext } from 'react'
import Home from './pages/client/home/Home';
import HomeAdmin from './pages/admin/home_admin/HomeAdmin';
import Chat from './pages/client/chat/Chat';

function App() {
  const { accountLogin } = useContext(AuthContext);
   const isAdmin = accountLogin?.role === "admin";
  return (
    <>
      {
        accountLogin?.role == "admin" ? <HomeAdmin/> : <Home/>
      }
      {/* CHAT ZALO + MESS - CHỈ HIỆN CLIENT */}
      {!isAdmin && <Chat />}
    </>
  )
}

export default App
