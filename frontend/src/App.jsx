import React, { useContext, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import { ThemeContext } from './utils/ThemeContext'
import RefundPolicy from './pages/Policy/RefundPolicy'
import PrivacyPolicy from './pages/Policy/PrivacyPolicy'
import ContactUs from './pages/Contact/ContactUs'
import About from './pages/About/About'
import Menu from './pages/Menu/Menu'

const App = () => {

    const [showLogin, setShowLogin] = useState(false);
    const { darkMode } = useContext(ThemeContext);

    return (
        <div className={`${darkMode && 'dark bg-slate-900'} min-h-screen flex flex-col gap-2 font-poppins`}>
            <Navbar setShowLogin={setShowLogin} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact-us' element={<ContactUs />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/menu' element={<Menu />} />
                <Route path='/order' element={<PlaceOrder />} />
                <Route path='/verify' element={<Verify />} />
                <Route path='/myorders' element={<MyOrders />} />
                <Route path='/refund-policy' element={<RefundPolicy />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            </Routes>
            <Footer />
            {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
        </div>
    )
}

export default App;