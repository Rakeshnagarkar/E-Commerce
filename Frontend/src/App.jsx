import Home from './Pages/Home'
import { Routes, Route } from 'react-router-dom'
import Collection from './Pages/Collection'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import Product from './Pages/Product'
import Login from './Pages/Login'
import PlaceOrder from './Pages/PlaceOrder'
import Orders from './Pages/Orders'
import Navbar from './components/Navbar'
import Footer from './Components/Footer'
import SearchBar from './Components/SearchBar'
import Verify from './Pages/Verify'

import { ToastContainer, toast } from 'react-toastify';


function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9v]">
      <Navbar />
      <SearchBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App