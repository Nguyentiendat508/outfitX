import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/client/Header'
import Footer from './components/client/Footer'
import Home from './pages/client/home/Home'
import AdminRouters from './routers/AdminRouters'
import ClientRouters from './routers/ClientRouters'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<>
          <Header />
          <Home />
          <Footer />
        </>} />
        <Route path="/admin" element={<AdminRouters />} />
        <Route path="/*" element={<ClientRouters />} />
      </Routes>
    </>
  )
}

export default App
