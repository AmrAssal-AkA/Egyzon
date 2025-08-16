import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Products from './pages/Products'
import PartnerPage from './pages/Partners'
import HomePage from './pages/Home'
import CartPage from './pages/cartpage'
import Electronics from './pages/electronics'
import Groceries from './pages/Groceries'
import ProductDetails from './pages/ProductDetails'
import ErrorPage from './pages/Error'
import './App.css'
import RootLayout from './component/RootLayout'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements (
      <Route path='/' element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<Products />} />
        <Route path="partners" element={<PartnerPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="electronic" element={<Electronics />} />
        <Route path='groceries' element={<Groceries />} />
        <Route path='Product/:id' element={<ProductDetails/>} />
        <Route path='*' element={<ErrorPage />} />
      </Route>
    )
  )
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
