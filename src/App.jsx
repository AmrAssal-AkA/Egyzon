import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './component/Header'
import Footer from './component/Footer'
import Products from './pages/Products'
import PartnerPage from './pages/Partners'
import HomePage from './pages/Home'
import CartPage from './pages/cartpage'
import Electronics from './pages/electronics'
import Groceries from './pages/Groceries'
import ProductDetails from './pages/ProductDetails'
import './App.css'

function App() {
  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/partners" element={<PartnerPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/electronic" element={<Electronics />} />
        <Route path='/groceries' element={<Groceries />} />
        <Route path='/Product/:id' element={<ProductDetails/>} />
        {/* Add other routes as needed */}
      </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App
