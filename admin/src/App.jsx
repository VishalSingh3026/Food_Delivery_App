import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { Route, Routes } from 'react-router-dom';
import LoginPopup from './components/LoginPopup';
import React, { useContext, useState } from 'react';
import { ThemeContext } from './utils/ThemeContext';
import Dashboard from './components/Dashboard';
import Category from './pages/Category/Category';
import Navbar from './components/Navbar/Navbar';
import PromoCode from './pages/PromoCode/PromoCode';
import Contacts from './pages/Contact/Contact';

const App = () => {

    const url = 'http://localhost:4000';
    const [showLogin, setShowLogin] = useState(false);
    const { darkMode } = useContext(ThemeContext);

    return (
        <div className={`${darkMode && 'dark bg-slate-900'} min-h-screen font-poppins`}>
            <Navbar />
            <Routes>
                <Route element={<Dashboard />}>
                    <Route path='/' element={<Add url={url} />} />
                    <Route path='/category' element={<Category url={url} />} />
                    <Route path="/promocode" element={<PromoCode url={url} />} />
                    <Route path="/list/items" element={<List url={url} />} />
                    <Route path="/orders" element={<Orders url={url} />} />
                    <Route path="/contact" element={<Contacts url={url} />} />
                </Route>
            </Routes>
            {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
        </div >
    )
}

export default App