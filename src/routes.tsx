// Recursos externos
import { Route, Routes } from 'react-router-dom'

// Páginas
import Home from './pages/Home'
import Perfil from './pages/Perfil'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/perfil/:id" element={<Perfil />} />
    {/* <Route path="/checkout" element={<Checkout />} /> */}
  </Routes>
)

export default Rotas
