import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from './components/footer/footer';
import Navbar from './components/navbar/navbar';

import Home from './pages/home';
import Browse from './pages/browse';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import Contact from './pages/contact';
import Item from './pages/item';
import Login from './pages/login';
import Register from './pages/register';
import About from './pages/about';
import NoPage from './pages/nopage';

function App() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
          </Route>
          <Route path="browse" element={<Browse />}>
            <Route path=":category" element={<Browse />}/>
          </Route>
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="contact" element={<Contact />} />
          <Route path="item" element={<Item />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="about" element={<About />} />
          <Route path="nopage" element={<NoPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
