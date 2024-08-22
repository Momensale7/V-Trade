import './App.css'
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toastify
import Home from './Pages/home';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import ProductDetails from './Pages/productDetails';
import Favorites from './Pages/favorites';
import Products from './Pages/Products';


function App() {
  //* toast wiil be very important for confirmation
  const fireToast=()=>{
    toast.info(
      <div>
        <span>Are you sure you want to delete this item?</span>
        <button onClick={()=>{console.log('deleted'),toast.dismiss();}} 
        className="ml-4 p-2 bg-red-500 text-white rounded">Delete</button>
        <button onClick={() => toast.dismiss()} className="ml-2 p-2 bg-gray-500 text-white rounded">Cancel</button>
      </div>,
      {
        position: "top-right",
        autoClose: false,  // Keep the toast visible until manually closed
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      }
    );
  };
    
  return (
    <>
    {/* expamle of tilwind classes  */}
    <p className='p-8 text-red-500 text-center fa-2xl
                  hover:text-blue-900 dark:text-white dark:bg-slate-950'
    >يلا يا رجالة</p>


    {/* example of toast */}
    <button onClick={()=>{fireToast()}} 
    className='block m-auto bg-blue-500 text-white p-3 rounded-md drop-shadow-md border'
      >fireToast</button>

    <ToastContainer />
    
    <BrowserRouter>
        {/* for try */}
        <Link to={'/favorites'} className='text-red-600 font-bold px-3'>Favorites</Link>
        <Link to={'/products'} className='text-red-600 font-bold px-3'>Products</Link>
        <Link to={'/home'} className='text-red-600 font-bold px-3'>Home</Link>

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/product/:productID' element={<ProductDetails />}/>
        <Route path='/favorites' element={<Favorites />}/>
        <Route path='/products' element={<Products />}/>
      </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
