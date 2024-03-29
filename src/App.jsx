import './App.css';
import React from 'react';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector( state => state.user.currUser);
  console.log(user)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:category' element={<ProductList />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to='/' /> : <Register />} />
        <Route path='/wishlist' element={user ? <Wishlist /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
