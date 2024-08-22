import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toastify

import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Footer from './component/Footer/Footer';
import Navbar from './component/Navbar/Navbar';

import Home from './Pages/home';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import ProductDetails from './Pages/productDetails';
import Favorites from './Pages/favorites';



function App() {
  
  
    
  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
       <Route path='/' element={<Home />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/product/:productID' element={<ProductDetails />}/>
        <Route path='/favorites' element={<Favorites />}/>
    </Routes>
    <Footer/>
    </BrowserRouter>

</>
  )
}

export default App
