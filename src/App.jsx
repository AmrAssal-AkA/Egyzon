import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './component/Header'
import Footer from './component/Footer'
import ProductsPage from './pages/Products'
import PartnerPage from './pages/Partners'
import HomePage from './pages/Home'
import CartPage from './pages/cartpage'
import Electronics from './pages/electronics'
import Groceries from './pages/Groceries'
import './App.css'

function App() {
  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/partners" element={<PartnerPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/electronic" element={<Electronics />} />
        <Route path='/groceries' element={<Groceries/>} />
        {/* Add other routes as needed */}
      </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App
